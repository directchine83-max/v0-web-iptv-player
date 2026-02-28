<template>
  <video-player :src="value" :tracks="tracks" :languages="languages" fluid class="video-player vjs-big-play-centered" />
</template>

<script setup>
import zhCN from "video.js/dist/lang/zh-CN.json";
import { computed, onMounted, ref, watch } from "vue";
import { translatePlugin, refreshTranslateBtn } from "../utils/videojsPlugins";
import videojs from "video.js";
const props = defineProps(["value", "track"]);
const tracks = computed(() => {
  return (
    (props.track && [
      {
        src: props.track,
        srclang: "en",
        label: "default",
        mode: "showing",
      },
    ]) ||
    undefined
  );
});
const languages = ref({
  "zh-CN": zhCN,
});

(() => {
  onMounted(() => {
    const player = videojs.getAllPlayers()[0];
    videojs.registerPlugin("translatePlugin", translatePlugin);
    player.translatePlugin();
    watch(tracks, () => {
      refreshTranslateBtn(player);
    });
  });
})();
</script>
