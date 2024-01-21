import {
  h,
  resolveComponent,
  withModifiers
} from 'vue'

export default {
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    let { slots, emit } = ctx
    console.log('child 的 props 和 ctx 对象', props, ctx)

    let ElCard = resolveComponent('el-card')
    let ElInput = resolveComponent('el-input')

    return () => h(ElCard, {
      header: '子组件',
    }, () => [
      h('p', [
        slots.header(),
        h('p', '子组件自己的内容'),
        slots.default(),
      ]),
      h('p', [
        '双向绑定输入：',
        h(ElInput, {
          modelValue: props.modelValue,
          'onUpdate:modelValue': val => emit('update:modelValue', val),
        })
      ])
    ])
  }
}