import { mount } from '@vue/test-utils'
import EditDialog from '@/components/Dialog/Edit.vue'

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

  it('clicking cancel button should not perform a save', async () => {
    const cancelButton = wrapper.find('.edit-cancel-button');
    await cancelButton.trigger('click');
    expect(wrapper.classes('.edit-dialog-snackbar')).toBe(false);
  })

  it('clicking edit button should perform a save', async () => {
    const submitButton = wrapper.find('.edit-submit-button');

    await wrapper.setData({
      formData: {
        type: "values",
        title: "Sample test title",
        description: "Sample test description"
      }
    });

    await submitButton.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
  })

  
})