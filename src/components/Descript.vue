<template>
  <div :class="[props.class, 'flex']">
    <div :class="props.labelClass">{{ props.label }}</div>
    <div class="flex-1 ml-4">
      <span v-if="props.content">{{ props.content }}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['label', 'labelClass', 'content', 'class', 'child'])

// 使用 mixins 数据
const mixins = (props: any) => {
  return [props]
}
</script>
