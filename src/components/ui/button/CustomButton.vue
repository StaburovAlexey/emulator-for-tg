<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  circle: {
    type: Boolean,
    default: false,
  },
  size:{
    type: String,
    default: 'medium',
  },
  color: {
    type: String,
    default: 'var(--tg-theme-button-color)',
  },
  textColor: {
    type: String,
    default: 'var(--tg-theme-button-text-color)',
  },
})
</script>

<template>
  <button class="my-button" :style="{
    'background-color': props.color,
    'color': props.textColor,
    'border-radius': props.circle ? '50%' : '5px',
  }"><slot></slot></button>
</template>

<style scoped>
.my-button {
  padding: 5px;
  font-size: 16px;
  color: var(--tg-theme-button-text-color);
  background-color: var(--tg-theme-button-color);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
