const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

/**
 * 生成 promise-based 动态 remote 表达式
 * webpack 在构建时将这段字符串直接嵌入 runtime，
 * URL 在运行时从 window.__REMOTE_URLS__ 读取，彻底解耦构建和部署
 */
function dynamicRemote(name, fallbackUrl) {
  return `promise new Promise((resolve, reject) => {
    var urls = window.__REMOTE_URLS__ || {};
    var url = urls['${name}'] || '${fallbackUrl}';
    var script = document.createElement('script');
    script.src = url + '/remoteEntry.js';
    script.onload = function() {
      var container = window['${name}'];
      if (!container) {
        reject(new Error('[main] 远程容器 ${name} 未在 window 上注册，请确认 ' + url + ' 可访问'));
        return;
      }
      var proxy = {
        get: function(request) { return container.get(request); },
        init: function(arg) {
          try { return container.init(arg); } catch(e) { return Promise.resolve(); }
        }
      };
      resolve(proxy);
    };
    script.onerror = function() {
      reject(new Error('[main] 加载 ${name} remoteEntry.js 失败: ' + url));
    };
    document.head.appendChild(script);
  })`
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto',
  devServer: {
    port: 8080
  },
  configureWebpack: {
    output: {
      uniqueName: 'main'
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'main',
        // ===== 运行时动态 remote —— URL 在 main.ts 里注入 window.__REMOTE_URLS__ =====
        remotes: {
          app1: dynamicRemote('app1', 'http://localhost:8081'),
          app2: dynamicRemote('app2', 'http://localhost:8082'),
        },
        shared: {
          vue: { singleton: true, eager: true, requiredVersion: '^2.6.14' },
          'vue-router': { singleton: true, eager: true, requiredVersion: '^3.5.1' },
          vuex: { singleton: true, eager: true, requiredVersion: '^3.6.2' },
          'element-ui': { singleton: true, eager: true, requiredVersion: '^2.15.14' }
        }
      })
    ]
  }
})
