<template>
  <Nav :tvs="tvs" :active="url" :isIptv="isIptv" :loading="loading" @switchMode="switchMode" />
  <component :is="currentView" :value="url" :track="caption" />
</template>

<script setup>
import { listTv } from "./api";
import { parse, suffix } from "./utils/tvlistsupport";
import { ref, computed, onMounted, watch } from "vue";
import Home from "./views/Index.vue";
import NotFound from "./views/NotFound.vue";
import Nav from "./components/Nav.vue";
import { useI18n } from "./i18n/index.js";

const { t, locale } = useI18n();

const IPTV_URL = "https://iptv-org.github.io/iptv/index.m3u"; // Global playlist for FREE IPTV
const DEFAULT_LIST = "https://iptv-org.github.io/iptv/countries/fr.m3u"; // French playlist for HOME

const routes = { "/": Home };
const currentPath = ref(window.location.hash);
const url = ref("");
const tvs = ref([]);
const caption = ref("");
const isIptv = ref(false);
const loading = ref(false);

// Cache for loaded playlists
const playlistCache = {};

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  const hash = currentPath.value;
  if (hash.slice(1).includes("?")) {
    const searchParams = new URLSearchParams(hash.slice(hash.indexOf("?")));
    const newUrl = searchParams.get("url");
    const newCaption = searchParams.get("caption");
    const iptvFlag = searchParams.get("iptv");

    if (newUrl) url.value = decodeURIComponent(newUrl);
    if (newCaption) caption.value = decodeURIComponent(newCaption);

    const wasIptv = isIptv.value;
    isIptv.value = iptvFlag === "1";

    // If switching mode via hash, reload the list
    if (wasIptv !== isIptv.value && !newUrl) {
      loadPlaylist(isIptv.value ? IPTV_URL : null);
    }
  }
  return routes[hash.slice(1).split("?")[0] || "/"] || NotFound;
});

function switchMode(mode) {
  isIptv.value = mode === "iptv";
  loadPlaylist(isIptv.value ? IPTV_URL : DEFAULT_LIST);
}

async function loadPlaylist(playlistUrl) {
  if (!playlistUrl) {
    const params = new URLSearchParams(window.location.hash.replace("#/", ""));
    // Use DEFAULT_LIST (French) for HOME mode, IPTV_URL for FREE IPTV
    playlistUrl = params.get("s") || (isIptv.value ? IPTV_URL : (localStorage.getItem("tvlistUrl") || DEFAULT_LIST));
  }

  // Check cache first
  if (playlistCache[playlistUrl]) {
    tvs.value = playlistCache[playlistUrl];
    selectFirstChannel();
    return;
  }

  loading.value = true;
  try {
    let suffixName = suffix(playlistUrl);
    if (suffixName === "m3u8") suffixName = "m3u";

    const d = await listTv(playlistUrl);
    const parsed = parse(d.data, suffixName);
    playlistCache[playlistUrl] = parsed;
    tvs.value = parsed;

    if (!isIptv.value) {
      localStorage.setItem("tvlistUrl", playlistUrl);
    }

    selectFirstChannel();
  } catch (e) {
    console.error("Failed to load playlist:", e);
    tvs.value = [{ name: t("failedToLoad"), isTv: false }];
  } finally {
    loading.value = false;
  }
}

function selectFirstChannel() {
  if (!url.value || isIptv.value) {
    const firstTv = tvs.value.find((t) => t.isTv);
    if (firstTv) {
      url.value = firstTv.url;
      caption.value = firstTv.caption;
    }
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.hash.replace("#/", ""));
  const url0 = params.get("url");
  const iptvFlag = params.get("iptv");

  if (url0) url.value = decodeURIComponent(url0);
  caption.value = params.get("caption");
  isIptv.value = iptvFlag === "1";

  loadPlaylist(isIptv.value ? IPTV_URL : null);
});
</script>
