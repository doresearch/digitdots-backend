import { BasicColumn, FormSchema } from '/@/components/Table';
import { h, unref } from 'vue';
import { Switch } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 150,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 150,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 200,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 150,
    customRender: ({ record }) => {
      const role = JSON.parse(record.role || []);
      return h('div', {}, role.join(', '));
    },
  },
  {
    title: '状态',
    dataIndex: 'active',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: +record.active === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        // onChange(checked: boolean) {
        //   record.pendingStatus = true;
        //   const newStatus = checked ? '1' : '0';
        //   const { createMessage } = useMessage();
        //   setRoleStatus(record.id, newStatus)
        //     .then(() => {
        //       record.status = newStatus;
        //       createMessage.success(`已成功修改角色状态`);
        //     })
        //     .catch(() => {
        //       createMessage.error('修改角色状态失败');
        //     })
        //     .finally(() => {
        //       record.pendingStatus = false;
        //     });
        // },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '用户ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'active',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema = (isUpdate): FormSchema[] => {
  return [
    {
      field: 'username',
      label: '用户名',
      required: true,
      component: 'Input',
      componentProps: {
        disabled: isUpdate,
      },
    },
    {
      field: 'password',
      label: '密码',
      required: true,
      component: 'InputPassword',
      ifShow: () => !unref(isUpdate),
    },
    {
      field: 'nickname',
      label: '昵称',
      required: true,
      component: 'Input',
    },
    {
      field: 'avatar',
      label: '头像',
      required: false,
      component: 'Upload',
    },
    {
      field: 'role2',
      label: '角色',
      required: false,
      slot: 'menu',
      component: 'Input',
    },
    {
      field: 'active',
      label: '状态',
      component: 'RadioButtonGroup',
      defaultValue: '1',
      componentProps: {
        options: [
          { label: '启用', value: '1' },
          { label: '停用', value: '0' },
        ],
      },
    },
  ];
};
