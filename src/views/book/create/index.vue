<template>
  <PageWrapper
    class="high-form"
    title="添加图书"
    content="请填写图书信息，并提交表单"
  >
    <a-card title="基本信息" :bordered="false">
      <BasicForm @register="register" />
    </a-card>
    <a-card title="上传电子书" :bordered="false" class="!mt-5">
      <BasicForm @register="registerTask" />
    </a-card>
    <a-card title="电子书目录" :bordered="false" class="!mt-5">
      <PersonTable ref="tableRef" :data="contentData" />
    </a-card>

    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import PersonTable from './PersonTable.vue';
  import { PageWrapper } from '/@/components/Page';
  import { schemas, taskSchemas, categoryOptions } from './data';
  import { Card, message } from 'ant-design-vue';
  import { addBook, addContents, getBook, updateBook } from '@/api/book/menu';
  import { hasAuth } from '@/utils/auth';
  import { BOOK_SUBMIT } from '@/utils/auth/permission-key';

  const DIR = '/opt/homebrew/var/www/upload';

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, PersonTable, PageWrapper, [Card.name]: Card },
    setup() {
      const tableRef = ref<{ getDataSource: () => any } | null>(null);
      const contentData = ref([]);
      const { currentRoute } = useRouter();

      const [register, { validate, setFieldsValue, resetFields }] = useForm({
        layout: 'vertical',
        baseColProps: {
          span: 6,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      const [registerTask, { validate: validateTaskForm, resetFields: resetFields2, setFieldsValue: setFieldsValue2, getFieldsValue }] = useForm({
        layout: 'vertical',
        baseColProps: {
          span: 6,
        },
        schemas: taskSchemas({ setFieldsValue, contentData }),
        showActionButtonGroup: false,
      });

      async function submitAll() {
        if (!hasAuth(BOOK_SUBMIT)) {
          return;
        }
        try {
          if (tableRef.value) {
            console.log('table data:', tableRef.value.getDataSource());
          }

          const [values, taskValues] = await Promise.all([validate(), validateTaskForm()]);
          console.log('form data:', values, taskValues, getFieldsValue());
          const {
            title,
            author,
            cover,
            fileName,
            language,
            publisher,
            rootFile,
            categoryText,
          } = values;
          const category = categoryOptions.find((item) => item.value === categoryText)?.label || 'unknown';
          const { id } = currentRoute.value.query;
          if (id) {
            const res = await updateBook({
              id,
              title,
              author,
              publisher,
              categoryText,
              language,
            });
            console.log(res);
            if (res.affectedRows === 1) {
              message.success('电子书更新成功');
            }
          } else {
            const res = await addBook({
              title,
              author,
              cover,
              fileName,
              language,
              publisher,
              rootFile,
              category: categoryText,
              categoryText: category,
            });
            console.log(res);
            for (const content of contentData.value) {
              const { text, id, playOrder, href } = content;
              const url = `http://localhost:8080/upload/book/${href}`;
              await addContents({
                fileName,
                id,
                href,
                order: playOrder,
                level: 0,
                text: url,
                label: text,
                pid: '',
                navId: id,
              });
            }
            // await addContents({});
            if (res.affectedRows === 1) {
              message.success('电子书新增成功');
              // 清空表单数据
              await resetFields();
              await resetFields2();
              contentData.value = [];
            }
          }
        } catch (error) {
          console.log('submitAll', error);
          if (error.message.startsWith('Duplicate entry')) {
            message.error('电子书重复添加');
          } else {
            message.error(error.message);
          }
        }
      }

      onMounted(() => {
        const { id } = currentRoute.value.query;
        if (id) {
          getBook(id).then((res) => {
            const [book] = res;
            console.log(book);
            setFieldsValue({
              title: book.title,
              author: book.author,
              publisher: book.publisher,
              language: book.language,
              categoryText: book.categoryText,
              fileName: book.fileName,
              cover: book.cover,
              rootFile: book.rootFile,
            });
            setFieldsValue2({
              book: [
                {
                  data: book,
                  dir: DIR,
                  mimetype: 'application/epub+zip',
                  originalName: book.fileName,
                  path: DIR + '/' + book.fileName,
                },
              ],
            });
          });
        }
      });
      return { register, registerTask, submitAll, tableRef, contentData };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
