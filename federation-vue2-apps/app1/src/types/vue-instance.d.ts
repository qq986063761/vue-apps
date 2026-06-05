import 'vue'
import { ElMessage } from 'element-ui/types/message'

type AjaxRequestMethod = (...args: unknown[]) => Promise<unknown>
type AjaxRequestMethodMap = Record<string, AjaxRequestMethod>

interface GlobalAjax {
  getUsers: AjaxRequestMethod
  app1?: AjaxRequestMethodMap
  app2?: AjaxRequestMethodMap
  [key: string]: AjaxRequestMethod | AjaxRequestMethodMap | undefined
}

declare module 'vue/types/vue' {
  interface Vue {
    $ajax: GlobalAjax
    $message: ElMessage
  }
}
