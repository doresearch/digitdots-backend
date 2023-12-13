<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, h } from 'vue';
  import {
    BasicTable,
    useTable,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';

  const columns: BasicColumn[] = [
    {
      title: '序号',
      dataIndex: 'playOrder',
    },
    {
      title: '目录ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'text',
    },

    {
      title: '链接',
      dataIndex: 'href',
      customRender: (data) => {
        const text = data.text;
        return {
          children: h(
            'a',
            {
              href: `http://localhost:8080/upload/book/${text}`,
              target: '_blank',
            },
            'Read',
          ),
        };
      },
    },
  ];

  export default defineComponent({
    components: { BasicTable },
    props: {
      data: Array,
    },
    setup(props) {
      const { data } = toRefs(props);
      const [registerTable, { getDataSource }] = useTable({
        columns: columns,
        showIndexColumn: false,
        dataSource: data,
        scroll: { y: '100%' },
        pagination: false,
      });

      function handleEdit(record: EditRecordRow) {
        record.onEdit?.(true);
      }

      function handleCancel(record: EditRecordRow) {
        record.onEdit?.(false);
        if (record.isNew) {
          const data = getDataSource();
          const index = data.findIndex((item) => item.key === record.key);
          data.splice(index, 1);
        }
      }

      function handleSave(record: EditRecordRow) {
        record.onEdit?.(false, true);
      }

      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
            },
          ];
        }
        return [
          {
            label: '保存',
            onClick: handleSave.bind(null, record, column),
          },
          {
            label: '取消',
            popConfirm: {
              title: '是否取消编辑',
              confirm: handleCancel.bind(null, record, column),
            },
          },
        ];
      }

      return {
        registerTable,
        handleEdit,
        createActions,
        getDataSource,
      };
    },
  });
</script>
