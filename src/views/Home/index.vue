<template>
  <div>
    <HelloWorld :msg="'test'" />
  </div>
</template>

<script lang="ts" setup name="Home">
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue'

const name = ref('test')
const a = 1
</script>

<style lang="scss" scoped></style>
