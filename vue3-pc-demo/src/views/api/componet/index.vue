<template>
  <div>
    <p>接收下面 v-model 的值 {{ text }}</p>
    <p>接收下面 v-model:title 的值 {{ title }}</p>
    <my-input class="block" v-model.param="text" v-model:title.param1="title">
    </my-input>

    <p>下面是异步组件：</p>
    <async class="block"></async>

    <p>
      <el-button type="primary" @click="showModal = true">
        打开 teleport 组件包裹的元素
      </el-button>
    </p>

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
let Async = defineAsyncComponent(() => import('./Async.vue'))

// 提供对象
provide('compIndex', readonly({ a: 1 }))

let text = ref('内容')
let title = ref('内容1')
let showModal = ref(false)
</script>

<style lang="scss">
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