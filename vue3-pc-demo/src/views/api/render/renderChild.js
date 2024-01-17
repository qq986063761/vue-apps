import {
  h
} from 'vue'

export default {
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    let { slots, emit } = ctx
    console.log('child 的 props 和 ctx 对象', props, ctx)

    return () => h('div', [
      h('p', [
        slots.header(),
        h('p', '子组件自己的内容'),
        slots.default(),
      ]),
      h('p', [
        h('span', '双向绑定输入：'),
        h('input', {
          value: props.modelValue,
          onInput: event => {
            emit('update:modelValue', event.target.value)
          }
        })
      ])
    ])
  }
}