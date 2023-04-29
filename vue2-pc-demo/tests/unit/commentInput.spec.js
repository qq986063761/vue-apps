import { mount } from '@vue/test-utils'
import Component from '../../src/components/CommentInput.vue'
import Vue from 'vue'
import Element from 'element-ui'

Vue.use(Element)

describe(Component.name, () => {
  const wrapper = mount(Component)

  it('是否存在 button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  it('模拟点击 button', async () => {
    const button = wrapper.find('.btn-submit')
    await button.trigger('click')
    expect(button.exists()).toBe(true)
  })
})
