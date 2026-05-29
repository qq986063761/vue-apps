<template>
  <div class="component-demo-page">
    <el-card class="demo-card">
      <template #header>
        <h2>Vue 组件 API 演示</h2>
      </template>
      <p><strong>这个页面演示了 Vue 3 组件的各种 API 和特性</strong></p>

      <!-- Props 示例 -->
      <h3>1. Props 传递数据</h3>
      <p>父组件向子组件传递数据：</p>
      <ChildComponent
        :message="parentMessage"
        :count="parentCount"
        :user="userData"
        @update-count="handleCountUpdate"
      />
      <el-button type="primary" @click="updateParentData">更新父组件数据</el-button>

      <el-divider />

      <!-- Emits 示例 -->
      <h3>2. Emits 事件通信</h3>
      <p>子组件向父组件发送事件：</p>
      <EventComponent @custom-event="handleCustomEvent" />
      <p v-if="eventMessage">收到事件: {{ eventMessage }}</p>

      <el-divider />

      <!-- Slots 示例 -->
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

      <el-divider />

      <!-- Provide/Inject 示例 -->
      <h3>4. Provide/Inject 跨组件通信</h3>
      <p>祖先组件提供数据，后代组件注入数据：</p>
      <ParentComponent />

      <el-divider />

      <!-- 生命周期示例 -->
      <h3>5. 生命周期钩子</h3>
      <p>查看控制台输出，观察生命周期执行顺序：</p>
      <LifecycleComponent v-if="showLifecycle" />
      <el-button type="primary" @click="toggleLifecycle">切换生命周期组件</el-button>

      <el-divider />

      <!-- 组合式函数示例 -->
      <h3>6. 组合式函数 (Composables)</h3>
      <p>使用组合式函数复用逻辑：</p>
      <p>鼠标位置: X: {{ mouse.x }}, Y: {{ mouse.y }}</p>
      <p>窗口大小: {{ windowSize.width }} x {{ windowSize.height }}</p>
    </el-card>
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

.demo-card {
  h2 {
    margin: 0;
    color: #409eff;
    font-size: 18px;
  }

  h3 {
    color: #2c3e50;
    margin-top: 0;
  }

  p {
    margin: 10px 0;
    font-size: 16px;
  }
}
</style>
