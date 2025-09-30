<template>
  <div class="componet-demo">
    <el-card>
      <template #header>
        父子组件通信
      </template>
      <p>接收子组件中 v-model 的值：{{ text }}</p>
      <p>接收子组件中 v-model:title 的值：{{ title }}</p>
      <my-input 
        class="block" 
        v-model.param="text" 
        v-model:title.param="title">
      </my-input>
    </el-card>

    <el-card>
      <template #header>
        异步组件
      </template>
      <async-comp class="block"></async-comp>
    </el-card>

    <el-card>
      <template #header>
        teleport 组件，可把内容放指定元素内，比如放 body 内
      </template>
      <el-button type="primary" @click="showModal = true">
        打开 teleport 组件内容
      </el-button>
    </el-card>

    <!-- teleport 组件可以让内部节点放到指定目标下 -->
    <teleport to="body">
      <div v-show="showModal" class="comp-modal">
        <div>
          <el-button 
            type="danger" 
            @click="showModal = false">
            关闭弹窗
          </el-button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import {
  ref,
  provide,
  readonly,
  defineAsyncComponent
} from 'vue'

import MyInput from './Input.vue'

// 异步组件
let AsyncComp = defineAsyncComponent(() => {
  // return import('./asyncComp.vue')
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./asyncComp.vue'))
    }, 3000)
  })
})

// 提供上下文给子组件注入
provide('parentData', readonly({ a: 1 }))

let text = ref('内容')
let title = ref('标题')
let showModal = ref(false)
</script>

<style lang="scss">
.componet-demo {
  .el-card {
    + .el-card {
      margin-top: 10px;
    }
  }
}

.comp-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 300px;
    height: 300px;
    padding: 5px;
  }
}
</style>