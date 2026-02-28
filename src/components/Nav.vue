<template>
  <div class="nav">
    <div class="nav-menu">
      <img class="logo" src="../assets/logo.svg" />
    </div>
    <div class="nav-list-warp">
      <ul class="nav-list">
        <li class="sub-nav" v-for="i in tvs" :key="i.url">
          <img v-if="i.meta && i.meta['tvg-logo']" :src="i.meta['tvg-logo']" class="tv-logo" />
          <a v-if="i.isTv" :class="{ active: i.url == active }" :href="'#/?url=' + i.url + (i.caption ? '&caption=' + i.caption : '')" @click="setTitle(i.name)">{{ i.name }}</a>
          <span v-else>{{ i.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps(["tvs", "active"]);

function setTitle(title) {
  document.title = title + " | Web TV";
}
</script>

<style scoped lang="less">
.nav {
  position: absolute;
  top: 1rem;
  left: 1rem;

  z-index: 100;
  color: #fff;
  .nav-menu {
    width: 1.5rem;
    height: 1.5rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    .logo {
      width: 1.5rem;
    }
  }
  .nav-list-warp {
    display: none;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem 0 1rem 1rem;
    border-radius: 1rem;
  }
  &:hover {
    .nav-list-warp {
      display: block;
    }
    .nav-menu {
      display: none;
    }
  }
  .active {
    color: #fd6a30;
  }
  .nav-list {
    margin: 0;
    padding: 0;
    list-style: none;

    max-height: calc(100vh - 4rem);
    overflow: auto;
  }
  .sub-nav {
    padding-left: 2rem;
    height: 2rem;
    line-height: 2rem;
    display: flex;
    align-items: center;
    .tv-logo {
      max-width: 3rem;
      max-height: 2rem;
      margin-right: 2rem;
    }
  }
  a {
    color: #fff;
  }
}
</style>
