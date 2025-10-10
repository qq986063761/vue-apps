<template>
  <div class="data-page">
    <h2>数据渲染 Demo</h2>
    <el-card class="data-card">
      <template #header>
        <span>用户数据列表</span>
      </template>
      
      <!-- 搜索框 -->
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索用户..."
          style="width: 300px; margin-bottom: 20px;"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- 数据表格 -->
      <el-table
        :data="filteredUsers"
        style="width: 100%"
        stripe
        border
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '活跃' : '非活跃' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          :total="filteredUsers.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑用户"
      width="500px"
    >
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="1" :max="100" />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="editForm.department" placeholder="请选择部门">
            <el-option label="技术部" value="技术部" />
            <el-option label="产品部" value="产品部" />
            <el-option label="运营部" value="运营部" />
            <el-option label="市场部" value="市场部" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editForm.status">
            <el-radio label="active">活跃</el-radio>
            <el-radio label="inactive">非活跃</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// 响应式数据
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const editForm = ref({
  id: null,
  name: '',
  email: '',
  age: null,
  department: '',
  status: 'active'
})

// 模拟用户数据
const users = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    age: 28,
    department: '技术部',
    status: 'active',
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    age: 32,
    department: '产品部',
    status: 'active',
    createTime: '2024-01-16 14:20:00'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    age: 25,
    department: '运营部',
    status: 'inactive',
    createTime: '2024-01-17 09:15:00'
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    age: 30,
    department: '市场部',
    status: 'active',
    createTime: '2024-01-18 16:45:00'
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    age: 27,
    department: '技术部',
    status: 'active',
    createTime: '2024-01-19 11:30:00'
  }
])

// 计算属性 - 过滤后的用户数据
const filteredUsers = computed(() => {
  let result = users.value
  
  // 搜索过滤
  if (searchKeyword.value) {
    result = result.filter(user => 
      user.name.includes(searchKeyword.value) ||
      user.email.includes(searchKeyword.value) ||
      user.department.includes(searchKeyword.value)
    )
  }
  
  return result
})

// 方法
const handleEdit = (row) => {
  editForm.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这个用户吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const index = users.value.findIndex(user => user.id === row.id)
    if (index > -1) {
      users.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  } catch {
    ElMessage.info('已取消删除')
  }
}

const handleSave = () => {
  const index = users.value.findIndex(user => user.id === editForm.value.id)
  if (index > -1) {
    users.value[index] = { ...editForm.value }
    ElMessage.success('保存成功')
  }
  dialogVisible.value = false
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

// 生命周期
onMounted(() => {
  console.log('数据渲染页面已加载')
})
</script>

<style scoped>
.data-page {
  padding: 20px;
}

.data-card {
  margin-top: 20px;
}

.search-section {
  margin-bottom: 20px;
}

.pagination-section {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

h2 {
  color: #409eff;
  margin-bottom: 20px;
}
</style>
