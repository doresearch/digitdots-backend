<template>
  <div :class="props.class">
    <div>{{ price }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['price', 'class'])

const price = computed(() => `$ ${formatPrice(props.price)}`)

// 传入数据是分，保留两位小数
function formatPrice(price: number) {
  return (price / 100).toFixed(2)
}
</script>
