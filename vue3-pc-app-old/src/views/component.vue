<template>
  <div class="component-demo-page">
    <!-- 组件基础 API 示例 -->
    <div class="demo-section">
      <h2>Vue 组件 API 演示</h2>
      <p><strong>这个页面演示了 Vue 3 组件的各种 API 和特性</strong></p>
      
      <!-- Props 示例 -->
      <div class="demo-item">
        <h3>1. Props 传递数据</h3>
        <p>父组件向子组件传递数据：</p>
        <ChildComponent 
          :message="parentMessage" 
          :count="parentCount"
          :user="userData"
          @update-count="handleCountUpdate"
        />
        <button @click="updateParentData">更新父组件数据</button>
      </div>

      <!-- Emits 示例 -->
      <div class="demo-item">
        <h3>2. Emits 事件通信</h3>
        <p>子组件向父组件发送事件：</p>
        <EventComponent @custom-event="handleCustomEvent" />
        <p v-if="eventMessage">收到事件: {{ eventMessage }}</p>
      </div>

      <!-- Slots 示例 -->
      <div class="demo-item">
        <h3>3. Slots 插槽</h3>
        <p>使用插槽传递内容：</p>
        <SlotComponent>
          <template #header>
            <h4>这是头部插槽</h4>
          </template>
          <template #default>
            <p>这是默认插槽的内容</p>
          </template>
          <template #footer>
            <p>这是底部插槽</p>
          </template>
        </SlotComponent>
      </div>

      <!-- Provide/Inject 示例 -->
      <div class="demo-item">
        <h3>4. Provide/Inject 跨组件通信</h3>
        <p>祖先组件提供数据，后代组件注入数据：</p>
        <ParentComponent />
      </div>

      <!-- 生命周期示例 -->
      <div class="demo-item">
        <h3>5. 生命周期钩子</h3>
        <p>查看控制台输出，观察生命周期执行顺序：</p>
        <LifecycleComponent v-if="showLifecycle" />
        <button @click="toggleLifecycle">切换生命周期组件</button>
      </div>

      <!-- 组合式函数示例 -->
      <div class="demo-item">
        <h3>6. 组合式函数 (Composables)</h3>
        <p>使用组合式函数复用逻辑：</p>
        <p>鼠标位置: X: {{ mouse.x }}, Y: {{ mouse.y }}</p>
        <p>窗口大小: {{ windowSize.width }} x {{ windowSize.height }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import ChildComponent from '../components/ChildComponent.vue'
import EventComponent from '../components/EventComponent.vue'
import SlotComponent from '../components/SlotComponent.vue'
import ParentComponent from '../components/ParentComponent.vue'
import LifecycleComponent from '../components/LifecycleComponent.vue'
import { useMouse, useWindowSize } from '../composables/useMouse.js'

// ========== Props 示例 ==========
const parentMessage = ref('来自父组件的消息')
const parentCount = ref(0)
const userData = ref({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
})

const updateParentData = () => {
  parentMessage.value = `更新后的消息 - ${Date.now()}`
  parentCount.value++
  userData.value.age++
}

const handleCountUpdate = (newCount) => {
  parentCount.value = newCount
}

// ========== Emits 示例 ==========
const eventMessage = ref('')

const handleCustomEvent = (data) => {
  eventMessage.value = `收到事件: ${data.message} (时间: ${data.timestamp})`
}

// ========== Provide/Inject 示例 ==========
const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 提供数据给后代组件
provide('theme', theme)
provide('toggleTheme', toggleTheme)

// ========== 生命周期示例 ==========
const showLifecycle = ref(true)

const toggleLifecycle = () => {
  showLifecycle.value = !showLifecycle.value
}

// ========== 组合式函数示例 ==========
const mouse = useMouse()
const windowSize = useWindowSize()

// 组件挂载时的生命周期
onMounted(() => {
  console.log('ComponentDemo 组件已挂载')
})

onUnmounted(() => {
  console.log('ComponentDemo 组件已卸载')
})
</script>

<style lang="scss" scoped>
.component-demo-page {
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

  h3 {
    color: #2c3e50;
    margin-top: 0;
  }

  p {
    margin: 10px 0;
    font-size: 16px;
  }

  button {
    margin: 5px;
    padding: 8px 16px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #337ecc;
    }
  }
}

h2 {
  color: #409eff;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}
</style>
