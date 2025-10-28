<script setup lang="ts">
import FooterComponent from '@/components/footer/FooterComponent.vue';
import MainComponent from '@/components/main/MainComponent.vue';
window.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  tg.ready();  
  tg.expand();    
  applyTheme(tg.themeParams);
  console.log('Current theme params:', tg.themeParams);
  tg.onEvent('themeChanged', () => applyTheme(tg.themeParams));
});
function applyTheme(tp = {}) {
  const root = document.documentElement;
  const map = {
    '--tg-theme-bg-color': tp.bg_color,
    '--tg-theme-text-color': tp.text_color,
    '--tg-theme-hint-color': tp.hint_color,
    '--tg-theme-link-color': tp.link_color,
    '--tg-theme-button-color': tp.button_color,
    '--tg-theme-button-text-color': tp.button_text_color,
    '--tg-theme-secondary-bg-color': tp.secondary_bg_color,
  };
  Object.entries(map).forEach(([k, v]) => v && root.style.setProperty(k, v));
}
</script>

<template>
    <MainComponent />
    <FooterComponent />

</template>


<style scoped></style>
