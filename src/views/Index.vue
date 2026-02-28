<template>
  <video-player :src="value" :tracks="tracks" :languages="languages" fluid class="video-player vjs-big-play-centered" />
</template>

<script setup>
import zhCN from "video.js/dist/lang/zh-CN.json";
import fr from "video.js/dist/lang/fr.json";
import { computed, onMounted, ref, watch } from "vue";
import { translatePlugin, refreshTranslateBtn } from "../utils/videojsPlugins";
import { useI18n } from "../i18n/index.js";
import videojs from "video.js";

const { t, locale } = useI18n();
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
  fr: fr,
});

(() => {
  onMounted(() => {
    const player = videojs.getAllPlayers()[0];
    videojs.registerPlugin("translatePlugin", translatePlugin);
    player.translatePlugin();

    // Set initial language and watch for changes
    player.language(locale.value === "fr" ? "fr" : "zh-CN");
    watch(locale, (newLocale) => {
      player.language(newLocale === "fr" ? "fr" : "zh-CN");
    });

    watch(tracks, () => {
      refreshTranslateBtn(player, t("translateBtn"));
    });
  });
})();
</script>
