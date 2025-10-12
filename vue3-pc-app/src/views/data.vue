<template>
  <div class="data-page">
    <!-- ref API 示例 -->
    <div class="demo-section">
      <h2>1. ref API 示例</h2>
      <p><strong>ref 用于创建响应式的基本类型数据</strong></p>
      
      <!-- 基本类型 ref -->
      <div class="demo-item">
        <h3>基本类型 ref</h3>
        <p>计数器: {{ count }}</p>
        <button @click="increment">增加计数</button>
      </div>
      
      <!-- 对象类型 ref -->
      <div class="demo-item">
        <h3>对象类型 ref</h3>
        <p>用户信息: {{ userInfo.name }} - {{ userInfo.age }}岁</p>
        <button @click="updateUserInfo">更新用户信息</button>
      </div>
    </div>

    <!-- reactive API 示例 -->
    <div class="demo-section">
      <h2>2. reactive API 示例</h2>
      <p><strong>reactive 用于创建响应式的对象</strong></p>
      
      <div class="demo-item">
        <h3>reactive 对象</h3>
        <p>库存: {{ product.stock }}件</p>
        <button @click="addStock">增加库存</button>
      </div>
    </div>

    <!-- computed API 示例 -->
    <div class="demo-section">
      <h2>3. computed API 示例</h2>
      <p><strong>computed 用于创建计算属性，基于响应式数据自动计算</strong></p>
      
      <div class="demo-item">
        <h3>基本计算属性</h3>
        <p>价格: {{ price }}元</p>
        <p>数量: {{ quantity }}件</p>
        <p><strong>总价: {{ totalPrice }}元</strong></p>
        <button @click="changePrice">修改价格</button>
        <button @click="changeQuantity">修改数量</button>
      </div>
      
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// ========== ref API 示例 ==========

// 1. 基本类型的 ref
const count = ref(0)  // 数字类型

// 2. 对象类型的 ref
const userInfo = ref({
  name: '张三',
  age: 25
})

// ref 相关方法
const increment = () => {
  count.value++  // 注意：需要通过 .value 访问和修改
}


const updateUserInfo = () => {
  // 修改 ref 对象的属性
  userInfo.value.name = '李四'
  userInfo.value.age = 30
}

// ========== reactive API 示例 ==========

// reactive 只能用于对象类型
const product = reactive({
  stock: 100
})

// reactive 相关方法
const addStock = () => {
  // 直接修改属性，无需 .value
  product.stock += 10
}

// ========== computed API 示例 ==========

// 1. 基本计算属性 - 基于 ref 数据
const price = ref(100)  // 价格
const quantity = ref(2)  // 数量

// 计算属性：总价 = 价格 × 数量
const totalPrice = computed((oldVal) => {
  // console.log('oldVal', oldVal)
  return price.value * quantity.value
})

// computed 相关方法
const changePrice = () => {
  price.value = Math.floor(Math.random() * 200) + 50  // 随机价格 50-250
}

const changeQuantity = () => {
  quantity.value = Math.floor(Math.random() * 5) + 1  // 随机数量 1-5
}
</script>

<style lang="scss" scoped>
.data-page {
  padding: 20px;
  max-width: 1000px;
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
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  border-left: 4px solid #42b883;

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
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #369870;
    }
  }
}

h2 {
  color: #42b883;
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
}
</style>
