// 使用阿里云服务器上传文件
// https://help.aliyun.com/zh/oss/developer-reference/installation?spm=a2c4g.11186623.0.i6#b909e07045ygm
import OSS from 'ali-oss'

export const client = new OSS({
  region: '',
  // 阿里云账号AccessKey拥有所有权限
  // 建议使用RAM用户
  // 从STS服务获取的安全令牌（SecurityToken）。
  stsToken: 'yourSecurityToken',
  bucket: 'for-yanhu-test',
})
