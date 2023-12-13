import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetBookList = '/book',
  GetContentsList = '/contents',
}

export const getBookList = (params) => {
  return defHttp.get({ url: Api.GetBookList, params });
};

export const getBook = (id) => {
  return defHttp.get({ url: Api.GetBookList + '/' + id });
};

export const addBook = (data) => {
  return defHttp.post({ url: Api.GetBookList, data }, { errorMessageMode: 'none' });
};

export const updateBook = (data) => {
  return defHttp.put({ url: Api.GetBookList, data }, { errorMessageMode: 'none' });
};

export const deleteBook = (id) => {
  return defHttp.delete({ url: Api.GetBookList, params: { id } });
};

export const addContents = (data) => {
  return defHttp.post({ url: Api.GetContentsList, data }, { errorMessageMode: 'none' });
};

export const deleteContents = (fileName) => {
  return defHttp.delete({ url: Api.GetContentsList, params: { fileName } });
};
