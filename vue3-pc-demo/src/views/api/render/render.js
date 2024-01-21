import {
  ref,
  h,
  resolveComponent,
  withModifiers,
  resolveDirective,
  withDirectives,
} from 'vue'
import Chlid from './renderChild.js'

export default {
  directives: {
    blue: {
      created(el) {
        el.style.color = '#fff'
        el.style.background = 'blue'
      }
    } 
  },
  setup(props, ctx) {
    let text = ref('内容')
    let blueDirective = resolveDirective('blue') // 解析指令
    let ElButton = resolveComponent('el-button') // 解析组件

    return () => h('div', [
      h('p', h(ElButton, {
        // 这里可以放任何属性
        class: 'btn-confirm',
        type: 'primary',
        // 事件方法 on + 驼峰命名，修饰可以像下面
        // onClickCapture onKeyupOnce onMouseoverOnceCapture 一样驼峰写后面
        // 也可以用 withModifiers 带修饰
        onClick: withModifiers(event => {
          console.log('onClick', event)
        }, ['stop'])
      }, () => '点击触发 onClick')),
      // 带指令
      withDirectives(
        h('p', {
          style: {
            padding: '10px'
          }
        }, 'v-model 双向绑定：' + text.value),
        [
          // <div v-blue:top.animate="200"></div>
          // [指令对象, 值, 参数, 修饰符]
          [blueDirective]
        ]
      ),
      // 组件
      h(Chlid, {
        // 传递 v-model
        modelValue: text.value,
        'onUpdate:modelValue': val => text.value = val,
      }, {
        // 传递 slot
        header: props => h('p', 'header slot'),
        default: () => [
          h('p', '默认 slot')
        ]
      })
    ])
  }
}