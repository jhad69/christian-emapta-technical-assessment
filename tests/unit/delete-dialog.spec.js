import Vue from 'vue'
import { mount } from '@vue/test-utils'
import DeleteDialog from '@/components/Dialog/Delete.vue'
Vue.config.ignoredElements = ['md-progress-spinner']

describe('Delete.vue', async () => {
  const wrapper = mount(DeleteDialog, {
    propsData: {
      showDeleteDialog: true,
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