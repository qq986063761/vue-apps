<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useApp1Store } from '@/exports/store'

interface AjaxResult {
  data?: unknown
}

const store = useApp1Store()
const route = useRoute()
const instance = getCurrentInstance()
const ajaxLoading = ref(false)
const ajaxResult = ref('')

const globalAjax = computed(() => instance?.appContext.config.globalProperties.$ajax)
const aboutPath = computed(() => (route.path.startsWith('/app1') ? '/app1/about' : '/about'))

function formatAjaxResult(response: unknown): string {
  const data =
    response && typeof response === 'object' && 'data' in response
      ? (response as AjaxResult).data
      : response

  try {
    return JSON.stringify(data, null, 2)
  } catch {
    return String(data)
  }
}

async function requestUsers(): Promise<void> {
  const ajax = globalAjax.value?.app1
  if (!ajax || typeof ajax.getUsers !== 'function') {
    ElMessage.warning('请在主应用中访问 app1 后再测试接口请求')
    return
  }

  ajaxLoading.value = true
  try {
    const response = await ajax.getUsers({ source: 'app1-home' })
    ajaxResult.value = formatAjaxResult(response)
    ElMessage.success('app1 接口请求完成')
  } catch (error) {
    console.error('[app1] getUsers request failed:', error)
    ElMessage.error('app1 接口请求失败，请查看控制台')
  } finally {
    window.setTimeout(() => {
      ajaxLoading.value = false
    }, 100)
  }
}
</script>

<template>
  <div class="sub-page app1-page">
    <h1>app1 首页</h1>
    <p class="intro">这是 app1 子应用的首页视图。</p>

    <el-card shadow="hover" class="demo-card">
      <template #header>
        <strong>app1 Store 状态</strong>
      </template>
      <p>
        appName:
        <span class="metric">{{ store.appName || '未加载' }}</span>
      </p>
      <p>
        count:
        <span class="metric">{{ store.count }}</span>
      </p>
      <p>
        doubleCount:
        <span class="metric">{{ store.doubleCount }}</span>
      </p>
      <div class="actions">
        <el-button type="primary" size="small" @click="store.increment()">count +1</el-button>
        <el-button type="primary" plain size="small" @click="store.setCount(10)">
          setCount(10)
        </el-button>
        <el-button type="primary" plain size="small" @click="store.incrementAsync()">
          async +1
        </el-button>
      </div>
    </el-card>

    <el-card shadow="hover" class="demo-card">
      <template #header>
        <strong>app1 Ajax 演示</strong>
      </template>
      <el-button type="primary" size="small" :loading="ajaxLoading" @click="requestUsers">
        请求 app1 getUsers
      </el-button>
      <pre v-if="ajaxResult">{{ ajaxResult }}</pre>
    </el-card>

    <router-link :to="aboutPath" class="page-link">进入 app1 关于页</router-link>
  </div>
</template>

<style scoped>
.sub-page {
  max-width: 920px;
}

h1 {
  margin: 0 0 12px;
  color: #2563eb;
  font-size: 28px;
}

.intro {
  margin: 0 0 18px;
  color: #667085;
}

.demo-card {
  margin-bottom: 16px;
}

.demo-card p {
  margin: 6px 0;
  color: #5f6b7a;
  font-size: 14px;
}

.metric {
  color: #2563eb;
  font-family: Consolas, "Liberation Mono", monospace;
  font-weight: 700;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

pre {
  margin: 12px 0 0;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  color: #344054;
  font-size: 12px;
  line-height: 1.5;
  padding: 12px;
  white-space: pre-wrap;
  word-break: break-word;
}

.page-link {
  display: inline-flex;
  margin-top: 4px;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
</style>
