// UI 组件库入口文件
// 用于 vue-cli-service build --target lib 构建

import UiButton from "./components/Button.vue";
import UiInput from "./components/Input.vue";
import UiDialog from "./components/Dialog.vue";
import UiMenu from "./components/Menu.vue";

// 按需引入时使用
export { UiButton, UiInput, UiDialog, UiMenu };

// 默认导出 —— 支持全量注册 Vue.use()
const components = {
  UiButton,
  UiInput,
  UiDialog,
  UiMenu,
};

const defaultExport = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(Vue: any): void {
    Object.keys(components).forEach((name) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Vue.component(name, (components as any)[name]);
    });
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default defaultExport;

// 导出类型（方便 TypeScript 用户）
export type { default as UiButtonType } from "./components/Button.vue";
export type { default as UiInputType } from "./components/Input.vue";
export type { default as UiDialogType } from "./components/Dialog.vue";
export type { default as UiMenuType } from "./components/Menu.vue";
