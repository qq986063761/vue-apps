<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    router
    :default-active="$route.path"
  >
    <template
      v-for="item in menus">
      <el-sub-menu
        :index="item.path"
        :key="item.path + 'sub'"
        v-if="item.children">
        <template #title>
          {{ item.label }}
        </template>
        <el-menu-item 
          :index="childItem.path"
          :key="childItem.path"
          v-for="childItem in item.children">
          {{ childItem.label }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item 
        :key="item.path"
        :index="item.path" v-else>
        {{ item.label }}
      </el-menu-item>
    </template>
  </el-menu>
  <router-view class="root-view"></router-view>
</template>

<script setup>
  let menus = [
    {
      path: '/api',
      label: 'api',
      children: [
        {
          path: '/api/template',
          label: '模板渲染'
        },
        {
          path: '/api/computed-watch',
          label: '计算，监听属性'
        },
        {
          path: '/api/directive',
          label: '指令'
        },
        {
          path: '/api/comp',
          label: '组件'
        },
        {
          path: '/api/render',
          label: '渲染函数'
        },
        {
          path: '/api/routerStore/child',
          label: '路由，状态管理'
        }
      ] 
    }
  ]
</script>

<style lang="scss">
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    display: flex;
    height: 100%;

    > .el-menu {
      flex-shrink: 0;
      width: 200px;
    }
  }

  p:first-child {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .block {
    padding: 20px;
    border: 1px solid #666;
  }

  .root-view {
    flex: 1;
    overflow: auto;
    padding: 20px;
  }
</style>
