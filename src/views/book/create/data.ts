import { FormSchema } from '/@/components/Form';
import axios from 'axios';
import { useGlobSetting } from '@/hooks/setting';
import { getToken } from '@/utils/auth';

const basicOptions: LabelValueOptions = [
  {
    label: 'EN',
    value: 'en',
  },
  {
    label: 'CN',
    value: 'cn',
  },
];

export const categoryOptions: LabelValueOptions = [
  {
    label: 'Biomedicine',
    value: '12',
  },
  {
    label: 'BusinessandManagement',
    value: '13',
  },
  {
    label: 'EarthSciences',
    value: '14',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '书名',
    required: true,
  },
  {
    field: 'author',
    component: 'Input',
    label: '作者',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'publisher',
    component: 'Input',
    label: '出版社',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'language',
    component: 'Select',
    label: '语言',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 'categoryText',
    component: 'Select',
    label: '类别',
    componentProps: {
      options: categoryOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'fileName',
    component: 'Input',
    label: '文件路径',
    // required: true,
    componentProps: {
      disabled: true,
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'cover',
    component: 'Input',
    label: '封面路径',
    componentProps: {
      disabled: true,
    },
    // required: true,
  },
  {
    field: 'rootFile',
    component: 'Input',
    label: '根文件',
    componentProps: {
      disabled: true,
    },
    // required: true,
    colProps: {
      offset: 2,
    },
  },
];
export const taskSchemas = ({ setFieldsValue, contentData }): FormSchema[] => {
  return [
    {
      field: 'book',
      component: 'Upload',
      label: '电子书',
      required: true,
      componentProps: {
        maxSize: 5,
        maxNumber: 1,
        accept: ['epub'],
        api: (data) => {
          const formData = new FormData();
          formData.append('file', data.file);
          const globSetting = useGlobSetting();
          const { apiUrl } = globSetting;
          const requestUrl = `${apiUrl}/book/upload`;
          console.log(data, apiUrl, requestUrl);
          return axios.post(requestUrl, formData, {
            headers: {
              'Content-type': data.file.type,
              Authorization: `Bearer ${getToken()}`,
            },
          });
        },
        onChange(files) {
          // 获取解析后的电子书数据
          if (!files || files.length < 1) {
            return;
          }
          const [file] = files;
          const { originalName } = file;
          const fileData = file.data;
          console.log(111, fileData);
          if (!fileData) {
            return;
          }
          const { title, creator, publisher, language, rootFile, cover, content } = fileData;
          setFieldsValue({
            title,
            author: creator,
            publisher,
            language,
            rootFile,
            cover,
            fileName: originalName,
          });
          contentData.value = content;
          console.log(contentData.value);
        },
      },
    },
  ];
};
