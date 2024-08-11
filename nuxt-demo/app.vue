<template>
  <div class="app">
    <NuxtPage />
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
</template>

<script>
// /**
//  * window.onerror 能捕获大部分的异常（同步、异步进行时的js异常），不能捕获语法错误
//  * @param {String} message 错误信息
//  * @param {String} source 出错文件
//  * @param {Number} lineno 行号
//  * @param {Number} colno 列号
//  * @param {Object} error Error对象（对象）
//  */
// window.onerror = function(message, source, lineno, colno, error) {
//   console.log('window.onerror', {message, source, lineno, colno, error})
//   return true // 返回 true 表示已经被接收，就不会被上抛给浏览器
// }

// /**
//  * window.addEventListener 监听 error 可以捕获到资源请求等异常
//  * @param {String} type 事件类型
//  * @param {function} fn 事件触发函数 
//  * @param {boolean|object} useCapture|options 是否启动捕获
//  */
// window.addEventListener('error', function (error) {
//   console.log('window-event-listener-error', error)
// }, true)

// // 捕获一些漏掉的 promise 异常，可通过 Promise.reject('promise error') 测试
// window.addEventListener("unhandledrejection", function (event) {
//   event.preventDefault()
//   console.log('unhandledrejection', event)
//   return true
// })

// // 崩溃日志处理
// window.addEventListener('load', function () {
//   sessionStorage.setItem('good_exit', 'pending')
//   // 一段时间汇报一下正常使用的时间日志
//   // setInterval(function () {
//   //   sessionStorage.setItem('time_before_crash', newDate().toString())
//   // }, 1000)
// })

// window.addEventListener('beforeunload', function () {
//   // 正常退出
//   sessionStorage.setItem('good_exit', 'true')
// })

// // 如果正常进入异常崩溃退出，崩溃退出时缓存变量将不会被设置为 true
// if (sessionStorage.getItem('good_exit') !== 'true') {
//   alert('异常崩溃退出日期：' + sessionStorage.getItem('time_before_crash'));
// }
</script>

<style lang="scss">
@use "~/assets/css/base.scss";

.app {
  height: 100%;
}
</style>
