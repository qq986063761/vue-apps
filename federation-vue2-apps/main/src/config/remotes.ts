/**
 * ============ 子应用远程入口配置 ============
 * 发布到不同环境时，只需修改此文件的 URL 即可，无需改动 webpack 配置
 */

export interface RemoteEntry {
  /** 子应用名称，即 ModuleFederationPlugin.name */
  name: string
  /** remoteEntry.js 的完整 URL（不含 /remoteEntry.js 后缀） */
  url: string
}

const REMOTE_CONFIG: RemoteEntry[] = [
  { name: 'app1', url: 'http://localhost:8081' },
  { name: 'app2', url: 'http://localhost:8082' },
]

export default REMOTE_CONFIG
