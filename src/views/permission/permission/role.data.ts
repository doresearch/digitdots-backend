import { unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '权限ID',
    dataIndex: 'id',
  },
  {
    title: '权限key',
    dataIndex: 'key',
  },
  {
    title: '权限名称',
    dataIndex: 'name',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: '权限key',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema = (isUpdate): FormSchema[] => (
  [{
    field: 'key',
    label: '权限key',
    required: true,
    component: 'Input',
    ifShow: () => !unref(isUpdate),
  },
  {
    field: 'name',
    label: '权限名称',
    required: true,
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  }]
);
