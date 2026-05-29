<template>
  <div class="router-demo">
    <!-- 当前路由信息 -->
    <el-card header="当前路由信息 (useRoute)" class="demo-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="path">{{ route.path }}</el-descriptions-item>
        <el-descriptions-item label="name">{{ route.name }}</el-descriptions-item>
        <el-descriptions-item label="params">{{ route.params }}</el-descriptions-item>
        <el-descriptions-item label="query">{{ route.query }}</el-descriptions-item>
        <el-descriptions-item label="hash">{{ route.hash || '无' }}</el-descriptions-item>
        <el-descriptions-item label="fullPath">{{ route.fullPath }}</el-descriptions-item>
        <el-descriptions-item label="meta" :span="2">{{ route.meta }}</el-descriptions-item>
        <el-descriptions-item label="matched (匹配的路由层级)" :span="2">
          <el-tag v-for="(record, i) in route.matched" :key="i" style="margin-right: 8px">
            {{ record.path }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 编程式导航 -->
    <el-card header="编程式导航 (useRouter)" class="demo-card">
      <div class="demo-section">
        <h4>router.push() — 跳转到其他页面</h4>
        <div class="btn-group">
          <el-button type="primary" @click="router.push('/data')">push /data</el-button>
          <el-button type="primary" @click="router.push({ name: 'Component' })">push by name → Component</el-button>
          <el-button type="primary" @click="router.push({ path: '/store-demo', query: { from: 'router-demo' } })">push 带 query</el-button>
        </div>
      </div>

      <el-divider />

      <div class="demo-section">
        <h4>router.replace() — 替换当前历史记录（不会留下历史）</h4>
        <div class="btn-group">
          <el-button type="warning" @click="router.replace({ path: '/router-demo', query: { replaced: Date.now() } })">replace 当前页（带 query）</el-button>
        </div>
      </div>

      <el-divider />

      <div class="demo-section">
        <h4>router.go() / router.back() / router.forward() — 历史栈导航</h4>
        <div class="btn-group">
          <el-button @click="router.back()">back() 返回</el-button>
          <el-button @click="router.forward()">forward() 前进</el-button>
          <el-button @click="router.go(-2)">go(-2) 后退两页</el-button>
        </div>
      </div>

      <el-divider />

      <div class="demo-section">
        <h4>router.resolve() — 解析路由（不实际跳转，仅获取解析后的路由对象）</h4>
        <el-input v-model="resolveInput" placeholder="输入路由路径，如 /data?id=1" style="width: 300px; margin-right: 8px" />
        <el-button @click="doResolve">解析</el-button>
        <p v-if="resolvedRoute" class="result-text">解析结果：{{ JSON.stringify(resolvedRoute) }}</p>
      </div>
    </el-card>

    <!-- Query 参数操作 -->
    <el-card header="Query 参数操作" class="demo-card">
      <p>当前 query：<el-tag>{{ JSON.stringify(route.query) }}</el-tag></p>
      <div class="btn-group" style="margin-top: 12px">
        <el-button type="success" @click="addQuery">添加 query 参数</el-button>
        <el-button type="danger" @click="removeQuery">移除 query 参数</el-button>
        <el-button @click="updateQuery">修改 query 参数</el-button>
      </div>
    </el-card>

    <!-- 导航守卫 -->
    <el-card header="组件内导航守卫 (onBeforeRouteLeave / onBeforeRouteUpdate)" class="demo-card">
      <div class="demo-section">
        <h4>表单编辑状态（模拟未保存离开提示）</h4>
        <el-switch v-model="hasUnsavedChanges" active-text="有未保存更改" inactive-text="已保存" />
        <p class="tip-text">打开开关后，尝试点击左侧菜单跳转到其他页面，会弹出确认框</p>
      </div>

      <el-divider />

      <div class="demo-section">
        <h4>onBeforeRouteUpdate — 监听同一路由的参数变化</h4>
        <p>修改 query 次数：<el-tag type="warning">{{ updateCount }}</el-tag></p>
        <p class="tip-text">每次通过按钮修改当前页面的 query 参数时触发，不会重新创建组件</p>
      </div>
    </el-card>

    <!-- keep-alive + v-slot 说明 -->
    <el-card header="keep-alive + v-slot 插槽模式（App.vue 层）" class="demo-card">
      <el-alert type="info" :closable="false" show-icon>
        <template #title>
          Vue 3 + vue-router 4 中，将 &lt;keep-alive&gt; 与 &lt;router-view&gt; 结合使用时，必须用 v-slot 插槽语法
        </template>
        <template #default>
          <pre class="code-block"><code>&lt;!-- 正确写法 (Vue 3) --&gt;
&lt;router-view v-slot="{ Component }"&gt;
  &lt;keep-alive&gt;
    &lt;component :is="Component" /&gt;
  &lt;/keep-alive&gt;
&lt;/router-view&gt;

&lt;!-- 错误写法 — Vue 3 中 keep-alive 不生效 --&gt;
&lt;keep-alive&gt;
  &lt;router-view /&gt;
&lt;/keep-alive&gt;</code></pre>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

// ========== router.resolve() 演示 ==========
const resolveInput = ref('/data?id=1')
const resolvedRoute = ref<any>(null)

const doResolve = () => {
  resolvedRoute.value = router.resolve(resolveInput.value)
}

// ========== Query 参数操作 ==========
const addQuery = () => {
  router.push({ query: { ...route.query, demoParam: 'hello', timestamp: Date.now() } })
}

const removeQuery = () => {
  const newQuery = { ...route.query }
  delete newQuery.demoParam
  delete newQuery.timestamp
  // 保留其他 query 参数，仅移除演示用的参数
  router.push({ query: newQuery })
}

const updateQuery = () => {
  router.push({ query: { ...route.query, page: Math.ceil(Math.random() * 10) } })
}

// ========== 导航守卫演示 ==========
const hasUnsavedChanges = ref(false)
const updateCount = ref(0)

// 离开当前页面前的守卫 — 模拟「未保存提示」
onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    // 注意：next() 在 vue-router 4 中已移除，改为 return false 或 return 新地址来取消导航
    const answer = window.confirm('你有未保存的更改，确定要离开吗？')
    if (!answer) return false
  }
})

// 同一个组件复用、但路由参数变化时触发 — 模拟「保留组件状态、仅刷新数据」
onBeforeRouteUpdate((to, from) => {
  updateCount.value++
  ElMessage.info(`路由参数已变化：${from.fullPath} → ${to.fullPath}`)
})
</script>

<style lang="scss" scoped>
.router-demo {
  padding: 20px;
  max-width: 960px;
}

.demo-card {
  margin-bottom: 20px;
}

.demo-section {
  h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #606266;
  }
}

.btn-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.result-text {
  margin-top: 10px;
  padding: 8px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 13px;
  word-break: break-all;
}

.tip-text {
  margin-top: 8px;
  font-size: 13px;
  color: #909399;
}

.code-block {
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  margin: 8px 0 0 0;
}
</style>
