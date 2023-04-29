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
        el.style.background = 'skyblue'
      }
    } 
  },
  setup(props, ctx) {
    let text = ref('内容')

    let blueDirective = resolveDirective('blue')
    let ElButton = resolveComponent('el-button')

    return () => h('div', [
      h('p', h(ElButton, {
        // 这里可以放任何属性
        type: 'primary',
        // 事件直接在 on 后接驼峰名就行，修饰符直接继续接后面
        // 像 onClickCapture onKeyupOnce onMouseoverOnceCapture
        // withModifiers 可以带修饰符
        onClick: withModifiers(event => {
          console.log('onClick', event)
        }, ['stop'])
      }, () => '点击')),
      // 带指令
      withDirectives(
        h('p', 'v-model 双向绑定值：' + text.value),
        [
          // <div v-blue:top.animate="200"></div>
          // [指令对象, 值, 参数, 修饰符]
          [blueDirective]
        ]
      ),
      h(Chlid, {
        class: 'block',
        // 传递 v-model 属性
        modelValue: text.value,
        'onUpdate:modelValue': val => text.value = val
      }, {
        // 传递 slot
        header: props => h('p', '传递 header slot 内容到子组件'),
        default: () => h('p', '传递默认 slot 内容到子组件')
      })
    ])
  }
}