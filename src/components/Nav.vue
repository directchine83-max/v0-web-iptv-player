<template>
  <div class="nav" :class="{ 'nav-open': isOpen }">
    <div class="nav-menu" @click="isOpen = true">
      <img class="logo" src="../assets/logo.svg" />
    </div>
    <div class="nav-list-warp" v-show="isOpen">
      <div class="nav-header">
        <span class="nav-title">Web TV</span>
        <button class="nav-close" @click="isOpen = false">&times;</button>
      </div>
      <div class="nav-tabs">
        <a
          class="nav-tab"
          :class="{ 'nav-tab-active': !isIptv }"
          href="#/"
          @click="$emit('switchMode', 'home')"
        >HOME</a>
        <a
          class="nav-tab"
          :class="{ 'nav-tab-active': isIptv }"
          href="#/?iptv=1"
          @click="$emit('switchMode', 'iptv')"
        >FREE IPTV</a>
      </div>
      <div class="nav-search" v-if="filteredTvs.length > 20">
        <input
          v-model="search"
          type="text"
          placeholder="Search channels..."
          class="nav-search-input"
        />
      </div>
      <div class="nav-loading" v-if="loading">
        <span class="spinner"></span> Loading channels...
      </div>
      <ul class="nav-list" v-else>
        <li class="sub-nav" v-for="i in filteredTvs" :key="i.url + i.name">
          <img v-if="i.meta && i.meta['tvg-logo']" :src="i.meta['tvg-logo']" class="tv-logo" loading="lazy" />
          <a
            v-if="i.isTv"
            :class="{ active: i.url == active }"
            :href="'#/?url=' + encodeURIComponent(i.url) + (i.caption ? '&caption=' + encodeURIComponent(i.caption) : '') + (isIptv ? '&iptv=1' : '')"
            @click="setTitle(i.name)"
          >{{ i.name }}</a>
          <span v-else class="group-label">{{ i.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["tvs", "active", "isIptv", "loading"]);
defineEmits(["switchMode"]);

const isOpen = ref(false);
const search = ref("");

const filteredTvs = computed(() => {
  if (!search.value.trim()) return props.tvs;
  const q = search.value.toLowerCase();
  return props.tvs.filter(
    (i) => i.name && i.name.toLowerCase().includes(q)
  );
});

function setTitle(title) {
  document.title = title + " | Web TV";
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
    display: none;
    background: rgba(10, 10, 20, 0.92);
    backdrop-filter: blur(12px);
    padding: 0;
    border-radius: 0;
    width: 300px;
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

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.5rem 1.2rem;
    .nav-title {
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.03em;
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

  .nav-tabs {
    display: flex;
    gap: 0;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-tab {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .nav-tab-active {
    color: #fd6a30;
    border-bottom-color: #fd6a30;
  }

  .nav-search {
    padding: 0.6rem 1rem;
    .nav-search-input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.45rem 0.8rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      font-size: 0.85rem;
      outline: none;
      &::placeholder {
        color: rgba(255, 255, 255, 0.35);
      }
      &:focus {
        border-color: #fd6a30;
      }
    }
  }

  .nav-loading {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 2rem 1.2rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }

  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-top-color: #fd6a30;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

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
    scrollbar-color: rgba(255,255,255,0.15) transparent;
  }

  .sub-nav {
    padding: 0 1rem 0 1.2rem;
    height: 2.2rem;
    line-height: 2.2rem;
    display: flex;
    align-items: center;
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
    .tv-logo {
      max-width: 2.5rem;
      max-height: 1.6rem;
      margin-right: 0.8rem;
      border-radius: 3px;
    }
    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.88rem;
    }
  }

  .group-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.35);
    padding-top: 0.5rem;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
}

@media (max-width: 600px) {
  .nav .nav-list-warp {
    width: 100vw;
  }
}
</style>
