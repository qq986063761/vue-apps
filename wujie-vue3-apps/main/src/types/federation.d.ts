/**
 * virtual:__federation__ 模块类型声明
 * 用于支持运行时动态加载 remote 模块
 */
declare module 'virtual:__federation__' {
  interface IRemoteConfig {
    url: (() => Promise<string>) | string
    format: 'esm' | 'systemjs' | 'var'
    from: 'vite' | 'webpack'
  }

  /**
   * 动态设置 remote 模块配置
   * @param name - remote 模块名称
   * @param config - remote 模块配置
   */
  export function __federation_method_setRemote(
    name: string,
    config: IRemoteConfig,
  ): void

  /**
   * 获取 remote 模块
   * @param remoteName - remote 模块名称
   * @param componentName - 组件名称
   * @returns Promise<unknown> - 返回的组件
   */
  export function __federation_method_getRemote(
    remoteName: string,
    componentName: string,
  ): Promise<unknown>

  /**
   * 解包模块，返回默认导出或模块本身
   * @param module - 要解包的模块
   * @returns unknown - 解包后的模块
   */
  export function __federation_method_unwrapDefault(
    module: unknown,
  ): unknown

  /**
   * 确保 remote 模块已初始化
   * @param remoteName - remote 模块名称
   * @returns Promise<unknown> - 初始化后的 remote
   */
  export function __federation_method_ensure(
    remoteName: string,
  ): Promise<unknown>
}
