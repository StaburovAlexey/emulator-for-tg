<script setup lang="ts">
</script>
<template>
  <div class="footer">
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.footer {
  position: relative;
  width: 100%;
  flex: 0 0 auto;
  height: 8dvh;
  background-image: radial-gradient(
    circle at 50% 0,
    transparent 30px,
    var(--tg-theme-bg-color) 20px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
}

.circle {
  position: absolute;
  top: 0;
  right: 50%;
  transform: translateX(50%) translateY(-50%);
  width: 45px;
  height: 45px;
  background-color: var(--tg-theme-bg-color);
  border-radius: 50%;
}
</style>
