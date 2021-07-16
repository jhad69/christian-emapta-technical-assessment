import { mount } from '@vue/test-utils'
import TheHeader from '@/components/TheHeader.vue'

describe('TheHeader.vue', () => {
  it('renders on header on load', () => {
    const wrapper = mount(TheHeader)
    expect(wrapper.isVisible()).toBe(true);
  })
})