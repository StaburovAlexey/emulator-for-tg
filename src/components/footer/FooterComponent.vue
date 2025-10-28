<script setup lang="ts">
import CustomButton from '@/components/ui/button/CustomButton.vue'
</script>
<template>
  <div class="footer">
    <div class="circle"></div>
    <CustomButton circle color="transparent" text-color="var(--tg-theme-button-color)"
      ><i-weui:home-filled class="icon"></i-weui:home-filled
    ></CustomButton>
    <CustomButton circle color="transparent" text-color="var(--tg-theme-button-color)"
      ><i-weui:folder-filled class="icon"></i-weui:folder-filled
    ></CustomButton>
    <CustomButton circle color="transparent" text-color="var(--tg-theme-button-color)"
      ><i-weui:share-filled class="icon"></i-weui:share-filled
    ></CustomButton>
    <CustomButton circle color="transparent" text-color="var(--tg-theme-button-color)"
      ><i-weui:setting-filled class="icon"></i-weui:setting-filled
    ></CustomButton>
  </div>
</template>

<style scoped>
.footer {
  padding: 0 10px;
  box-sizing: border-box;
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
  justify-content: space-between;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
}
.footer button {
  height: 70%;
}
.footer .circle {
  position: absolute;
  top: 0;
  right: 50%;
  transform: translateX(50%) translateY(-50%);
  width: 45px;
  height: 45px;
  background-color: var(--tg-theme-bg-color);
  border-radius: 50%;
}
.footer .icon {
  width: 100%;
  height: 100%;
}
</style>
