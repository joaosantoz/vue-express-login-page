import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FormButton from '@/components/form-button/FormButton.vue';

describe('FormButton', () => {
  it('should render button with correct text', () => {
    const title = 'Submit';
    const variation = 'primary';
    const wrapper = shallowMount(FormButton, {
      props: {
        title,
        variation,
      },
    });

    expect(wrapper.text()).toBe(title);
  });

  it('should render button with correct variation class', () => {
    const title = 'Submit';
    const variation = 'primary';
    const wrapper = shallowMount(FormButton, {
      props: {
        title,
        variation,
      },
    });

    expect(wrapper.classes(variation)).toBe(true);
  });

  it('should emit "buttonClicked" event when button is clicked', () => {
    const title = 'Submit';
    const variation = 'primary';
    const wrapper = shallowMount(FormButton, {
      props: {
        title,
        variation,
      },
    });

    wrapper.trigger('click');
    expect(wrapper.emitted().buttonClicked).toBeTruthy();
  });
});
