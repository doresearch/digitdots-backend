import { Persistent, BasicKeys } from '/@/utils/cache/persistent';
import { CacheTypeEnum, TOKEN_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { useUserStore } from '@/store/modules/user';
import { message } from 'ant-design-vue';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}

export function hasAuth(key, msg = '') {
  if (!msg) {
    msg = `缺少${key}权限，无法进行操作`;
  }
  const userStore = useUserStore();
  const { userInfo } = userStore;
  const { auth = [] } = userInfo;
  const hasAuth = auth.find((a) => a.key === key);
  console.log(userInfo);
  if (!hasAuth) {
    message.error(msg);
    return false;
  }
  return true;
}
