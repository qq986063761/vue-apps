<template>
  <div class="builtin-components-demo">
    <h1>Vue 3 内置组件演示</h1>
    <p>这个页面演示了 Vue 3 的各种内置组件和特性</p>

    <!-- Transition 组件演示 -->
    <div class="demo-section">
      <h2>1. Transition 组件 - 过渡动画</h2>
      <div class="demo-item">
        <h3>基础过渡效果</h3>
        <button @click="showBasic = !showBasic">切换显示</button>
        <Transition name="fade">
          <div v-if="showBasic" class="transition-box">
            这是一个淡入淡出的过渡效果
          </div>
        </Transition>
      </div>

      <div class="demo-item">
        <h3>滑动过渡效果</h3>
        <button @click="showSlide = !showSlide">切换显示</button>
        <Transition name="slide">
          <div v-if="showSlide" class="transition-box">
            这是一个滑动过渡效果
          </div>
        </Transition>
      </div>

      <div class="demo-item">
        <h3>列表过渡效果</h3>
        <div class="list-controls">
          <button @click="addItem">添加项目</button>
          <button @click="removeItem">删除项目</button>
          <button @click="shuffleList">打乱顺序</button>
        </div>
        <TransitionGroup name="list" tag="div" class="list-container">
          <div v-for="item in listItems" :key="item.id" class="list-item">
            {{ item.text }}
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- KeepAlive 组件演示 -->
    <div class="demo-section">
      <h2>2. KeepAlive 组件 - 缓存组件</h2>
      <div class="demo-item">
        <h3>组件缓存演示</h3>
        <p>切换组件时，KeepAlive 会保持组件的状态</p>
        <div class="tab-container">
          <div class="tab-buttons">
            <button 
              v-for="tab in tabs" 
              :key="tab.name"
              :class="{ active: currentTab === tab.name }"
              @click="currentTab = tab.name"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="tab-content">
            <KeepAlive>
              <component :is="components[currentTab]" />
            </KeepAlive>
          </div>
        </div>
      </div>
    </div>

    <!-- Teleport 组件演示 -->
    <div class="demo-section">
      <h2>3. Teleport 组件 - 传送门</h2>
      <div class="demo-item">
        <h3>模态框演示</h3>
        <button @click="showModal = true">打开模态框</button>
        <p>模态框会被传送到 body 元素中</p>
        
        <Teleport to="body">
          <div v-if="showModal" class="modal-overlay" @click="showModal = false">
            <div class="modal-content" @click.stop>
              <h3>这是一个模态框</h3>
              <p>这个模态框通过 Teleport 被传送到 body 元素中</p>
              <button @click="showModal = false">关闭</button>
            </div>
          </div>
        </Teleport>
      </div>

      <div class="demo-item">
        <h3>通知消息演示</h3>
        <button @click="showNotification = true">显示通知</button>
        
        <Teleport to="#notification-container">
          <Transition name="notification">
            <div v-if="showNotification" class="notification">
              <span>这是一条通知消息</span>
              <button @click="showNotification = false">×</button>
            </div>
          </Transition>
        </Teleport>
      </div>
    </div>

    <!-- Suspense 组件演示 -->
    <div class="demo-section">
      <h2>4. Suspense 组件 - 异步组件</h2>
      <div class="demo-item">
        <h3>异步组件加载</h3>
        <button @click="loadAsyncComponent">加载异步组件</button>
        <button @click="showAsync = false">隐藏组件</button>
        
        <div v-if="showAsync" class="async-container">
          <Suspense>
            <template #default>
              <AsyncComponent />
            </template>
            <template #fallback>
              <div class="loading">正在加载异步组件...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>

    <!-- 自定义指令演示 -->
    <div class="demo-section">
      <h2>5. 自定义指令</h2>
      <div class="demo-item">
        <h3>v-focus 指令</h3>
        <input v-focus placeholder="这个输入框会自动获得焦点" />
      </div>
      
      <div class="demo-item">
        <h3>v-color 指令</h3>
        <p v-color="'red'">这段文字是红色的</p>
        <p v-color="'blue'">这段文字是蓝色的</p>
        <p v-color="'green'">这段文字是绿色的</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import TabA from '@/components/TabA.vue'
import TabB from '@/components/TabB.vue'
import TabC from '@/components/TabC.vue'

// ========== Transition 演示 ==========
const showBasic = ref(false)
const showSlide = ref(false)

// 列表过渡
const listItems = ref([
  { id: 1, text: '项目 1' },
  { id: 2, text: '项目 2' },
  { id: 3, text: '项目 3' }
])

let nextId = 4

const addItem = () => {
  listItems.value.push({
    id: nextId++,
    text: `项目 ${nextId - 1}`
  })
}

const removeItem = () => {
  if (listItems.value.length > 0) {
    listItems.value.pop()
  }
}

const shuffleList = () => {
  listItems.value = listItems.value.sort(() => Math.random() - 0.5)
}

// ========== KeepAlive 演示 ==========
const currentTab = ref('TabA')

const tabs = [
  { name: 'TabA', label: '标签页 A' },
  { name: 'TabB', label: '标签页 B' },
  { name: 'TabC', label: '标签页 C' }
]

// 标签页组件已导入

// ========== Teleport 演示 ==========
const showModal = ref(false)
const showNotification = ref(false)

// ========== Suspense 演示 ==========
const showAsync = ref(false)

// 异步组件
const AsyncComponent = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        template: `
          <div class="async-component">
            <h4>异步组件已加载</h4>
            <p>这个组件是异步加载的，使用了 2 秒的延迟</p>
            <p>当前时间: {{ currentTime }}</p>
          </div>
        `,
        setup() {
          const currentTime = ref(new Date().toLocaleString())
          return { currentTime }
        }
      })
    }, 2000)
  })
})

const loadAsyncComponent = () => {
  showAsync.value = true
}

// ========== 自定义指令 ==========
// v-focus 指令
const vFocus = {
  mounted(el) {
    el.focus()
  }
}

// v-color 指令
const vColor = {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
}

// 组件映射，让模板能够找到这些组件
const components = {
  TabA,
  TabB,
  TabC
}
</script>

<style lang="scss" scoped>
.builtin-components-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.demo-item {
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 6px;
  border-left: 4px solid #409eff;
}

.demo-item h3 {
  color: #2c3e50;
  margin-top: 0;
}

/* Transition 样式 */
.transition-box {
  padding: 20px;
  background-color: #409eff;
  color: white;
  border-radius: 4px;
  margin: 10px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.list-item {
  padding: 10px 15px;
  background-color: #409eff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.5s;
}

/* KeepAlive 样式 */
.tab-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.tab-buttons {
  display: flex;
  background-color: #f5f5f5;
}

.tab-buttons button {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  border-right: 1px solid #ddd;
}

.tab-buttons button:last-child {
  border-right: none;
}

.tab-buttons button.active {
  background-color: #409eff;
  color: white;
}

.tab-content {
  padding: 20px;
  min-height: 200px;
}


/* Teleport 样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #409eff;
  color: white;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1001;
}

.notification-enter-active, .notification-leave-active {
  transition: all 0.3s;
}

.notification-enter-from, .notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Suspense 样式 */
.async-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

.async-component {
  padding: 20px;
  background-color: #f0f9ff;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

/* 按钮样式 */
button {
  margin: 5px;
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #337ecc;
}

.list-controls button {
  margin-right: 10px;
}

h1 {
  color: #409eff;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  color: #409eff;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}
</style>
