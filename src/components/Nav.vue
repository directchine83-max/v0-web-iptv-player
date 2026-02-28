<template>
  <div class="nav" :class="{ 'nav-open': isOpen }">
    <!-- Collapsed icon button -->
    <div class="nav-menu" @click="isOpen = true">
      <img class="logo" src="../assets/logo.svg" alt="Web TV" />
    </div>

    <!-- Sidebar panel -->
    <div class="nav-list-warp" v-show="isOpen">
      <!-- Header -->
      <div class="nav-header">
        <span class="nav-title">{{ t('appTitle') }}</span>
        <div class="nav-header-actions">
          <button
            class="lang-toggle"
            @click="toggleLocale"
            :title="t('langSwitch')"
            :aria-label="'Switch to ' + t('langSwitch')"
          >{{ t('langSwitch') }}</button>
          <button class="nav-close" @click="isOpen = false" aria-label="Close">&times;</button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="nav-tabs">
        <a
          class="nav-tab"
          :class="{ 'nav-tab-active': !isIptv }"
          href="#/"
          @click="handleHomeTab"
        >{{ t('tabHome') }}</a>
        <a
          class="nav-tab"
          :class="{ 'nav-tab-active': isIptv }"
          href="#/?iptv=1"
          @click="handleIptvTab"
        >{{ t('tabIptv') }}</a>
      </div>

      <!-- HOME mode: flat channel list -->
      <template v-if="!isIptv">
        <div class="nav-search" v-if="tvs.length > 20 || search">
          <input
            v-model="search"
            type="text"
            :placeholder="t('searchPlaceholder')"
            class="nav-search-input"
          />
        </div>
        <div class="nav-loading" v-if="loading">
          <span class="spinner"></span>
          <span>{{ t('loadingChannels') }}</span>
        </div>
        <template v-else>
          <div class="nav-channel-count" v-if="tvChannelCount > 0 && !search">
            {{ t('channelCount', { count: tvChannelCount }) }}
          </div>
          <div class="nav-no-results" v-if="search && filteredTvs.length === 0">
            {{ t('noResults') }}
          </div>
          <ul class="nav-list" ref="channelListRef">
            <li class="sub-nav" v-for="i in filteredTvs" :key="i.url + i.name">
              <img
                v-if="i.meta && i.meta['tvg-logo']"
                :src="i.meta['tvg-logo']"
                class="tv-logo"
                loading="lazy"
                alt=""
              />
              <a
                v-if="i.isTv"
                :class="{ active: i.url == active }"
                :href="'#/?url=' + encodeURIComponent(i.url) + (i.caption ? '&caption=' + encodeURIComponent(i.caption) : '')"
                @click="setTitle(i.name)"
              >{{ i.name }}</a>
              <span v-else class="group-label">{{ i.name }}</span>
            </li>
          </ul>
        </template>
      </template>

      <!-- IPTV mode: catalog or filtered channel list -->
      <template v-if="isIptv">
        <!-- Sub-view: channel list (after picking a category/language) -->
        <template v-if="iptvView === 'channels'">
          <button class="nav-back" @click="goBackToCatalog">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            <span>{{ t('backToCatalog') }}</span>
          </button>
          <div class="nav-active-filter">
            <span class="nav-active-filter-icon">{{ activeFilterIcon }}</span>
            <span class="nav-active-filter-label">{{ activeFilterLabel }}</span>
          </div>
          <div class="nav-search">
            <input
              v-model="search"
              type="text"
              :placeholder="t('searchPlaceholder')"
              class="nav-search-input"
            />
          </div>
          <div class="nav-loading" v-if="loading">
            <span class="spinner"></span>
            <span>{{ t('loadingChannels') }}</span>
          </div>
          <template v-else>
            <div class="nav-channel-count" v-if="tvChannelCount > 0 && !search">
              {{ t('channelCount', { count: tvChannelCount }) }}
            </div>
            <div class="nav-no-results" v-if="search && filteredTvs.length === 0">
              {{ t('noResults') }}
            </div>
            <ul class="nav-list" ref="channelListRef">
              <li class="sub-nav" v-for="i in filteredTvs" :key="i.url + i.name">
                <img
                  v-if="i.meta && i.meta['tvg-logo']"
                  :src="i.meta['tvg-logo']"
                  class="tv-logo"
                  loading="lazy"
                  alt=""
                />
                <a
                  v-if="i.isTv"
                  :class="{ active: i.url == active }"
                  :href="'#/?url=' + encodeURIComponent(i.url) + (i.caption ? '&caption=' + encodeURIComponent(i.caption) : '') + '&iptv=1' + activeFilterHash"
                  @click="setTitle(i.name)"
                >{{ i.name }}</a>
                <span v-else class="group-label">{{ i.name }}</span>
              </li>
            </ul>
          </template>
        </template>

        <!-- Sub-view: catalog (default) -->
        <template v-else>
          <div class="catalog" ref="catalogRef">
            <!-- Categories Section -->
            <div class="catalog-section">
              <h3 class="catalog-section-title">{{ t('categories') }}</h3>
              <div class="catalog-grid">
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  class="catalog-chip"
                  @click="selectCategory(cat)"
                >
                  <span class="catalog-chip-icon">{{ cat.icon }}</span>
                  <span class="catalog-chip-label">{{ getLabel(cat, locale) }}</span>
                </button>
              </div>
            </div>

            <!-- Languages Section -->
            <div class="catalog-section">
              <h3 class="catalog-section-title">{{ t('languages') }}</h3>
              <div class="catalog-grid">
                <button
                  v-for="lang in catalogLanguages"
                  :key="lang.code"
                  class="catalog-chip"
                  @click="selectLanguage(lang)"
                >
                  <span class="catalog-chip-icon">{{ lang.icon }}</span>
                  <span class="catalog-chip-label">{{ getLabel(lang, locale) }}</span>
                </button>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "../i18n/index.js";
import {
  categories,
  languages as catalogLanguages,
  categoryUrl,
  languageUrl,
  getLabel,
} from "../data/iptvCatalog.js";

const { t, locale, toggleLocale } = useI18n();

const props = defineProps(["tvs", "active", "isIptv", "loading"]);
const emit = defineEmits(["switchMode", "loadIptvPlaylist"]);

const isOpen = ref(false);
const search = ref("");
const channelListRef = ref(null);
const catalogRef = ref(null);

// IPTV sub-view state: "catalog" or "channels"
const iptvView = ref("catalog");
const activeFilterIcon = ref("");
const activeFilterLabel = ref("");
const activeFilterType = ref(""); // "cat" or "lang"
const activeFilterId = ref("");   // category id or language code

const tvChannelCount = computed(() => {
  return props.tvs.filter((i) => i.isTv).length;
});

const filteredTvs = computed(() => {
  if (!search.value.trim()) return props.tvs;
  const q = search.value.toLowerCase();
  return props.tvs.filter(
    (i) => i.name && i.name.toLowerCase().includes(q)
  );
});

const activeFilterHash = computed(() => {
  if (activeFilterType.value === "cat") return `&cat=${activeFilterId.value}`;
  if (activeFilterType.value === "lang") return `&lang=${activeFilterId.value}`;
  return "";
});

// When switching away from IPTV, reset to catalog view
watch(() => props.isIptv, (val) => {
  if (!val) {
    iptvView.value = "catalog";
    search.value = "";
  }
});

function handleHomeTab() {
  iptvView.value = "catalog";
  search.value = "";
  emit("switchMode", "home");
}

function handleIptvTab() {
  iptvView.value = "catalog";
  search.value = "";
  emit("switchMode", "iptv");
}

function selectCategory(cat) {
  activeFilterType.value = "cat";
  activeFilterId.value = cat.id;
  activeFilterIcon.value = cat.icon;
  activeFilterLabel.value = getLabel(cat, locale.value);
  search.value = "";
  iptvView.value = "channels";
  emit("loadIptvPlaylist", categoryUrl(cat.id));
}

function selectLanguage(lang) {
  activeFilterType.value = "lang";
  activeFilterId.value = lang.code;
  activeFilterIcon.value = lang.icon;
  activeFilterLabel.value = getLabel(lang, locale.value);
  search.value = "";
  iptvView.value = "channels";
  emit("loadIptvPlaylist", languageUrl(lang.code));
}

function goBackToCatalog() {
  iptvView.value = "catalog";
  search.value = "";
  activeFilterType.value = "";
  activeFilterId.value = "";
}

function setTitle(title) {
  document.title = title + t("titleSuffix");
}
</script>

<style scoped lang="less">
.nav {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  color: #fff;

  .nav-menu {
    width: 1.5rem;
    height: 1.5rem;
    padding: 1rem;
    margin: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
    .logo {
      width: 1.5rem;
    }
  }

  .nav-list-warp {
    background: rgba(10, 10, 20, 0.94);
    backdrop-filter: blur(14px);
    padding: 0;
    border-radius: 0;
    width: 320px;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &:not(.nav-open) {
    .nav-list-warp {
      display: none;
    }
  }

  &.nav-open {
    .nav-menu {
      display: none;
    }
    .nav-list-warp {
      display: flex;
    }
  }

  /* ---- Header ---- */
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 0.8rem 0.5rem 1.2rem;
    min-height: 2.4rem;

    .nav-title {
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      white-space: nowrap;
    }

    .nav-header-actions {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-shrink: 0;
    }

    .lang-toggle {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 0.22rem 0.55rem;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
      line-height: 1.2;
      white-space: nowrap;
      &:hover {
        background: #fd6a30;
        border-color: #fd6a30;
      }
    }

    .nav-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      line-height: 1;
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  /* ---- Tabs ---- */
  .nav-tabs {
    display: flex;
    gap: 0;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-tab {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .nav-tab-active {
    color: #fd6a30;
    border-bottom-color: #fd6a30;
  }

  /* ---- Back button ---- */
  .nav-back {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.65rem 1rem 0.35rem;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.78rem;
    cursor: pointer;
    transition: color 0.15s;
    &:hover {
      color: #fd6a30;
    }
    svg {
      flex-shrink: 0;
    }
  }

  /* ---- Active filter badge ---- */
  .nav-active-filter {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.25rem 1.2rem 0.45rem;
    .nav-active-filter-icon {
      font-size: 1.1rem;
      line-height: 1;
    }
    .nav-active-filter-label {
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }
  }

  /* ---- Search ---- */
  .nav-search {
    padding: 0.45rem 1rem 0.4rem;
    .nav-search-input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.42rem 0.8rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
      font-size: 0.82rem;
      outline: none;
      transition: border-color 0.2s;
      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
      &:focus {
        border-color: #fd6a30;
      }
    }
  }

  /* ---- Info lines ---- */
  .nav-channel-count {
    padding: 0.15rem 1.2rem 0.25rem;
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 0.03em;
  }

  .nav-no-results {
    padding: 2rem 1.2rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }

  .nav-loading {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 2rem 1.2rem;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.88rem;
  }

  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top-color: #fd6a30;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ---- Channel list ---- */
  .active {
    color: #fd6a30;
  }

  .nav-list {
    margin: 0;
    padding: 0;
    list-style: none;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.12) transparent;
  }

  .sub-nav {
    padding: 0 1rem 0 1.2rem;
    height: 2.2rem;
    line-height: 2.2rem;
    display: flex;
    align-items: center;
    min-width: 0;
    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }
    .tv-logo {
      max-width: 2.5rem;
      max-height: 1.6rem;
      margin-right: 0.8rem;
      border-radius: 3px;
      flex-shrink: 0;
    }
    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.86rem;
      min-width: 0;
    }
  }

  .group-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.3);
    padding-top: 0.5rem;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  /* ---- Catalog browse ---- */
  .catalog {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.6rem 0 1.5rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.12) transparent;
  }

  .catalog-section {
    padding: 0.6rem 1rem 0.2rem;
  }

  .catalog-section-title {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.35);
    margin: 0 0 0.55rem 0.15rem;
  }

  .catalog-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .catalog-chip {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.65rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.82);
    cursor: pointer;
    font-size: 0.78rem;
    line-height: 1.2;
    transition: all 0.18s;
    white-space: nowrap;
    &:hover {
      background: rgba(253, 106, 48, 0.14);
      border-color: rgba(253, 106, 48, 0.5);
      color: #fff;
    }
    &:active {
      transform: scale(0.97);
    }
    .catalog-chip-icon {
      font-size: 0.95rem;
      line-height: 1;
    }
    .catalog-chip-label {
      font-weight: 500;
    }
  }
}

@media (max-width: 600px) {
  .nav .nav-list-warp {
    width: 100vw;
  }
}
</style>
