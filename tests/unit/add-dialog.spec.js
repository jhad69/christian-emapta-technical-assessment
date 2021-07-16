import { mount } from '@vue/test-utils'
import AddDialog from '@/components/Dialog/Add.vue'

describe('Add.vue', async () => {
  const wrapper = mount(AddDialog, {
    propsData: {
      showAddDialog: true,
      type: 'values'
    }
  })

  it('displays the modal', () => {
    expect(wrapper.isVisible()).toBe(true);
  })
})