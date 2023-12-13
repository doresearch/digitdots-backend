import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  GetActiveMenu = '/menu/active',
  CreateMenu = '/menu',
  UpdateMenu = '/menu',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const getActiveMenu = () => {
  return defHttp.get({ url: Api.GetActiveMenu });
};

export const createMenu = (data) => {
  return defHttp.post({ url: Api.CreateMenu, data });
};

export const updateMenu = (data) => {
  return defHttp.put({ url: Api.CreateMenu, data });
};
