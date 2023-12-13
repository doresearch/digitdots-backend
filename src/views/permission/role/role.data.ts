import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色ID',
    dataIndex: 'id',
  },
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema = (isUpdate): FormSchema[] => {
  return [
    {
      field: 'name',
      label: '角色名称',
      required: true,
      component: 'Input',
      // componentProps: {
      //   disabled: isUpdate,
      // },
    },
    {
      label: '备注',
      field: 'remark',
      component: 'InputTextArea',
    },
    {
      label: ' ',
      field: 'menu',
      slot: 'menu',
      component: 'Input',
    },
    {
      label: ' ',
      field: 'auth',
      slot: 'auth',
      component: 'Input',
    },
  ];
};
