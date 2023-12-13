<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'name', key: 'id' }"
          checkable
          toolbar
          title="角色列表"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { addUser, editUser, getRoleList } from '@/api/sys/user';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup: function(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema(isUpdate),
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          const res = await getRoleList();
          if (res) {
            treeData.value = res;
          }
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          data.record.active = String(data.record.active);
          console.log(data.record, treeData.value);
          let { role } = data.record;
          role = JSON.parse(role);
          const role2 = role.map((roleItem) => {
            return (treeData.value.find(tree => tree.name === roleItem))?.id
          });
          data.record.role2 = role2.filter(_ => _);
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          console.log(values);
          const params: any = {};
          params.username = values.username;
          params.password = values.password;
          params.nickname = values.nickname;
          params.avatar = values.avatar || 'https://www.youbaobao.xyz/mpvue-res/logo.jpg';
          params.role = values.role2 || [];
          params.role = JSON.stringify(params.role.map((id) =>
            (treeData.value.find(tree => tree.id === id))?.name));
          params.active = values.active || 1;
          const update = unref(isUpdate);
          console.log(params);
          if (update) {
            // 调用编辑API
            const res = await editUser(params);
            if (res.affectedRows === 1) {
              message.success('编辑用户成功');
            }
          } else {
            // 调用新增API
            const res = await addUser(params);
            if (res.affectedRows === 1) {
              message.success('新增用户成功');
            }
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  }) as any;
</script>
