import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import TheBody from '@/components/TheBody.vue'
Vue.config.ignoredElements = ['md-progress-spinner']

describe('TheBody.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TheBody, {
      methods: {
        getAllData: () => {}
      },
    })
  });

  it('displays the title', () => {
    expect(wrapper.find("h1").text()).toBe("The Agile Manifesto");
  })
})