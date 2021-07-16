import { mount } from '@vue/test-utils'
import TheFooter from '@/components/TheFooter.vue'

describe('TheHeader.vue', () => {
  it('renders on header on load', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.isVisible()).toBe(true);
  })
})