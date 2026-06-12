export function isHostedByOtherOrigin(sourceUrl = import.meta.url) {
  try {
    return new URL(sourceUrl).origin !== window.location.origin
  } catch (e) {
    return false
  }
}

export function isQiankunEntry(sourceUrl = import.meta.url) {
  try {
    return new URL(sourceUrl).searchParams.has('__qiankun__')
  } catch (e) {
    return false
  }
}

export function isQiankunRuntime(sourceUrl = import.meta.url) {
  return Boolean(
    isQiankunEntry(sourceUrl) ||
    window.__POWERED_BY_QIANKUN__ ||
    globalThis.__POWERED_BY_QIANKUN__ ||
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ ||
    globalThis.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ ||
    window.__QIANKUN_PROPS__ ||
    isHostedByOtherOrigin(sourceUrl)
  )
}

export function markQiankunRuntime() {
  window.__POWERED_BY_QIANKUN__ = true
  globalThis.__POWERED_BY_QIANKUN__ = true
}
