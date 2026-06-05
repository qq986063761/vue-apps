<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-green-600 mb-4">app2 首页</h1>
    <p class="text-gray-600 mb-4">这是 app2 子应用的首页视图。</p>
    <el-card shadow="hover" class="mb-4">
      <div slot="header" class="font-semibold">app2 Store 状态</div>
      <p class="text-sm text-gray-600">
        appName: <span class="font-mono text-green-600">{{ appName || '未加载' }}</span>
      </p>
      <p class="text-sm text-gray-600 mt-1">
        count: <span class="font-mono text-green-600">{{ count }}</span>
      </p>
      <p class="text-sm text-gray-600 mt-1">
        doubleCount: <span class="font-mono text-green-600">{{ doubleCount }}</span>
      </p>
      <div class="mt-3">
        <el-button type="success" size="mini" @click="increment">
          count +1
        </el-button>
        <el-button type="success" plain size="mini" @click="setCount(10)">
          setCount(10)
        </el-button>
        <el-button type="success" plain size="mini" @click="incrementAsync">
          async +1
        </el-button>
      </div>
    </el-card>
    <el-card shadow="hover" class="mb-4">
      <div slot="header" class="font-semibold">app2 Ajax 演示</div>
      <el-button type="success" size="mini" :loading="ajaxLoading" @click="requestUsers">
        请求 app2 getUsers
      </el-button>
      <pre v-if="ajaxResult" class="mt-3 p-3 text-xs text-gray-700 bg-gray-50 border border-gray-200 whitespace-pre-wrap break-all">{{ ajaxResult }}</pre>
    </el-card>
    <router-link to="/app2/about" class="text-green-500 hover:underline">→ 进入 app2 关于页</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('app2', ['appName', 'count']),
    ...mapGetters('app2', ['doubleCount'])
  },
  methods: {
    ...mapMutations('app2', ['increment', 'setCount']),
    ...mapActions('app2', ['incrementAsync'])
  }
})
export default class HomeView extends Vue {
  appName!: string
  count!: number
  doubleCount!: number
  ajaxLoading = false
  ajaxResult = ''
  increment!: () => void
  setCount!: (payload: number) => void
  incrementAsync!: () => void

  async requestUsers(): Promise<void> {
    const ajax = this.$ajax && this.$ajax.app2
    if (!ajax || typeof ajax.getUsers !== 'function') {
      this.$message.warning('请在主应用中访问 app2 后再测试接口请求')
      return
    }

    this.ajaxLoading = true
    try {
      const response = await ajax.getUsers({ source: 'app2-home' })
      this.ajaxResult = this.formatAjaxResult(response)
      this.$message.success('app2 接口请求完成')
    } catch (error) {
      console.error('[app2] getUsers 请求失败:', error)
      this.$message.error('app2 接口请求失败，请查看控制台')
    } finally {
      setTimeout(() => {
        this.ajaxLoading = false
      }, 100)
    }
  }

  private formatAjaxResult(response: unknown): string {
    // 接口响应通常是 AxiosResponse，演示区只展示 data，避免输出过多运行时对象。
    const data = response && typeof response === 'object' && 'data' in response
      ? (response as { data: unknown }).data
      : response

    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }
}
</script>
