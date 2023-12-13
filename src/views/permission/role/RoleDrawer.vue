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
          title="菜单分配"
        />
      </template>
      <template #auth="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="authData"
          :fieldNames="{ title: 'name', key: 'id' }"
          checkable
          toolbar
          title="权限分配"
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

  import { getActiveMenu } from '/@/api/sys/menu';
  import {
    addRole, addRoleAuth,
    addRoleMenu, deleteRoleAuthByRoleId,
    deleteRoleMenuByRoleId,
    editRole, getAuthList, getRoleAuth,
    getRoleMenu,
  } from '@/api/sys/user';
  import { message } from 'ant-design-vue';
  import { treeData } from '@/views/demo/tree/data';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);
      const authData = ref<TreeItem[]>([]);
      const roleIdData = ref();

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
          const menuList = await getActiveMenu();
          console.log(menuList);
          treeData.value = menuList;
        }
        if (unref(authData).length === 0) {
          const authList = await getAuthList({});
          console.log(authList);
          authData.value = authList;
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const roleId = data.record.id;
          const roleMenuList = (await getRoleMenu({ roleId })) || [];
          const roleAuthList = (await getRoleAuth({ roleId })) || [];
          console.log(roleMenuList, roleAuthList);
          data.record.menu = roleMenuList.map((item) => item.menuId);
          data.record.auth = roleAuthList.map((item) => item.authId);
          setFieldsValue({
            ...data.record,
          });
          roleIdData.value = data.record.id;
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          console.log(values);
          if (unref(isUpdate)) {
            const roleId = roleIdData.value;
            const res = await editRole({ id: roleId, ...values });
            if (res) {
              message.success('编辑角色成功');
              await deleteRoleMenuByRoleId({ roleId });
              await deleteRoleAuthByRoleId({ roleId });
              const { menu = [], auth = [] } = values;
              for (let menuId of menu) {
                await addRoleMenu({ roleId, menuId });
              }
              for (let authId of auth) {
                await addRoleAuth({ roleId, authId });
              }
              closeDrawer();
              emit('success');
            } else {
              message.error('编辑角色失败');
            }
          } else {
            const res = await addRole(values);
            if (res) {
              message.success('新增角色成功');
              // 提交角色和菜单的绑定关系
              const { id: roleId } = res;
              const { menu = [], auth = [] } = values;
              for (let menuId of menu) {
                await addRoleMenu({ roleId, menuId });
              }
              for (let authId of auth) {
                await addRoleAuth({ roleId, authId });
              }
              closeDrawer();
              emit('success');
            } else {
              message.error('新增角色失败');
            }
          }
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
        authData,
      };
    },
  }) as any;
</script>
