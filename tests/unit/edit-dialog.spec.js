import Vue from 'vue'
import { mount } from '@vue/test-utils'
import EditDialog from '@/components/Dialog/Edit.vue'
Vue.config.ignoredElements = ['md-progress-spinner']

describe('Edit.vue', async () => {
  const wrapper = mount(EditDialog, {
    propsData: {
      showEditDialog: true,
      data: {
        id: 1,
        title: 'test title',
        description: 'test description',
        dateAdded: 'Oct 5 1991'
      },
      type: 'values'
    }
  })

  it('displays the modal', () => {
    expect(wrapper.isVisible()).toBe(true);
  })

  
})