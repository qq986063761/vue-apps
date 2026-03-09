<template>
  <div id="app" class="main-app">
    <SideMenu />
    <div class="main-content">
      <!-- Vue3 中 keep-alive 需配合 router-view 插槽使用 -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'
import { mapState } from 'vuex'
import { injectThemeToDocument } from './assets/theme'

export default {
  name: 'App',
  components: {
    SideMenu
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme: {
      handler() {
        injectThemeToDocument(document)
      },
      immediate: true
    }
  },
  mounted() {
    injectThemeToDocument(document)
  }
}
</script>

<style lang="scss" scoped>
#app.main-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  height: 100%;
  overflow: auto;
  background: #f0f2f5;
}

.micro-app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
