<template>
  <div id="app">
    <h1 class="app-title">UI 组件库开发预览</h1>

    <!-- Button 组件 -->
    <section class="demo-section">
      <h2>Button 按钮</h2>
      <div class="demo-row">
        <ui-button @click="onClick('默认')">默认按钮</ui-button>
        <ui-button type="primary" @click="onClick('主要')">主要按钮</ui-button>
        <ui-button type="success">成功按钮</ui-button>
        <ui-button type="warning">警告按钮</ui-button>
        <ui-button type="danger">危险按钮</ui-button>
        <ui-button type="info">信息按钮</ui-button>
      </div>
      <div class="demo-row">
        <ui-button type="primary" plain>朴素按钮</ui-button>
        <ui-button type="success" plain>朴素按钮</ui-button>
        <ui-button type="danger" plain>朴素按钮</ui-button>
      </div>
      <div class="demo-row">
        <ui-button type="primary" round>圆角按钮</ui-button>
        <ui-button type="primary" size="small">小尺寸</ui-button>
        <ui-button type="primary" size="large">大尺寸</ui-button>
        <ui-button type="primary" disabled>禁用状态</ui-button>
        <ui-button type="primary" loading>加载中</ui-button>
      </div>
    </section>

    <!-- Input 组件 -->
    <section class="demo-section">
      <h2>Input 输入框</h2>
      <div class="demo-row" style="max-width: 400px">
        <ui-input
          v-model="inputValue"
          placeholder="请输入内容"
          clearable
        ></ui-input>
      </div>
      <p class="demo-value">输入值: {{ inputValue || "(空)" }}</p>
      <div class="demo-row" style="max-width: 400px">
        <ui-input
          v-model="inputValue2"
          placeholder="禁用状态"
          disabled
        ></ui-input>
      </div>
      <div class="demo-row" style="max-width: 400px">
        <ui-input
          v-model="inputValue3"
          placeholder="错误提示"
          error-msg="请输入正确的内容"
        ></ui-input>
      </div>
      <div class="demo-row" style="max-width: 400px">
        <ui-input
          v-model="inputValue4"
          size="small"
          placeholder="小尺寸输入框"
        ></ui-input>
      </div>
      <div class="demo-row" style="max-width: 400px">
        <ui-input
          v-model="inputValue5"
          size="large"
          placeholder="大尺寸输入框"
        ></ui-input>
      </div>
    </section>

    <!-- Dialog 组件 -->
    <section class="demo-section">
      <h2>Dialog 对话框</h2>
      <div class="demo-row">
        <ui-button type="primary" @click="dialogVisible = true"
          >打开对话框</ui-button
        >
      </div>
      <ui-dialog
        :visible.sync="dialogVisible"
        title="操作确认"
        @close="onDialogClose"
      >
        <p>确定要执行此操作吗？</p>
        <p style="color: #909399; margin-top: 8px">
          此操作不可撤销，请谨慎操作。
        </p>
        <template #footer>
          <ui-button @click="dialogVisible = false">取消</ui-button>
          <ui-button type="primary" @click="onConfirm">确定</ui-button>
        </template>
      </ui-dialog>
      <p class="demo-value">
        对话框状态: {{ dialogVisible ? "打开" : "关闭" }}
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  // Input 数据
  inputValue = "";
  inputValue2 = "不可编辑内容";
  inputValue3 = "";
  inputValue4 = "";
  inputValue5 = "";

  // Dialog 数据
  dialogVisible = false;

  onClick(type: string): void {
    console.log(`点击了 ${type} 按钮`);
  }

  onDialogClose(): void {
    console.log("对话框已关闭");
  }

  onConfirm(): void {
    console.log("确认操作");
    this.dialogVisible = false;
  }
}
</script>

<style lang="scss">
#app {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ebeef5;
}

.demo-section {
  margin-bottom: 36px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid #409eff;
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.demo-value {
  font-size: 13px;
  color: #909399;
  margin-bottom: 8px;
}
</style>
