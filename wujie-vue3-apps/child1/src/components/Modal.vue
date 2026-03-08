<template>
  <el-dialog
    :model-value="visible"
    :title="dialogTitle"
    :width="width"
    :close-on-click-modal="false"
    :append-to-body="true"
    @update:model-value="handleVisibleChange"
    @close="handleCancel"
  >
    <div v-if="isVNode">
      <component :is="content" />
    </div>
    <div v-else>
      <div v-html="content"></div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">{{ cancelText }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const dialogTitle = ref('提示')
const content = ref('')
const isVNode = ref(false)
const width = ref('480px')
const confirmText = ref('确 定')
const cancelText = ref('取 消')
const onConfirm = ref(null)
const onCancel = ref(null)

// options: { title, content (string|component), width, confirmText, cancelText, onConfirm, onCancel }
const show = (options = {}) => {
  const {
    title,
    content: contentValue,
    width: widthValue,
    confirmText: confirmTextValue,
    cancelText: cancelTextValue,
    onConfirm: onConfirmValue,
    onCancel: onCancelValue
  } = options

  dialogTitle.value = title || '提示'
  width.value = widthValue || '480px'
  confirmText.value = confirmTextValue || '确 定'
  cancelText.value = cancelTextValue || '取 消'
  onConfirm.value = typeof onConfirmValue === 'function' ? onConfirmValue : null
  onCancel.value = typeof onCancelValue === 'function' ? onCancelValue : null

  // content can be a string (HTML) or a component/options
  isVNode.value = typeof contentValue === 'object' && contentValue !== null
  content.value = contentValue || ''

  visible.value = true
}

const handleVisibleChange = (val) => {
  visible.value = val
}

const handleConfirm = () => {
  if (onConfirm.value) {
    try { 
      onConfirm.value({ num: 1, date: new Date(), cb: () => {} }) 
    } catch (e) { 
      /* noop */ 
    }
  }
  visible.value = false
}

const handleCancel = () => {
  if (onCancel.value) {
    try { 
      onCancel.value() 
    } catch (e) { 
      /* noop */ 
    }
  }
  visible.value = false
}

// 暴露方法供外部调用
defineExpose({
  show
})
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
