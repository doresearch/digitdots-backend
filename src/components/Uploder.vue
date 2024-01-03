<template>
  <el-upload
    class="avatar-uploader"
    :http-request="handleUpload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<script lang="ts" setup>
import { getUploadToken } from '@/api'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(uploadFile)
  // getUploadToken({}).then(res => {
  //   console.log(res)
  // })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  return true
}

async function handleUpload(file) {
  console.log('file', file)
  const res = await getUploadToken({})

  const result: any = res.data.result
  console.log(result)
  // eslint-disable-next-line no-undef
  const client = new OSS({
    region: 'oss-cn-beijing',
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: result.AccessKeyId,
    accessKeySecret: result.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: result.SecurityToken,
    // 填写Bucket名称，例如examplebucket。
    bucket: result.buketName,
    secure: false,
  })
  // const url = store.signatureUrl('oss.png')
  try {
    // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
    // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
    // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
    const options = {
      meta: { source: 'digitdots' },
      mime: 'json',
      headers: { 'Content-Type': 'image/png', 'Content-Disposition': 'inline' },
    }
    const result = await client.put(`for-yanhu-test/${file.file.name}`, file.file, options)
    imageUrl.value = result.url
  } catch (e) {
    console.log('upload ===>', e)
  }
}
</script>
