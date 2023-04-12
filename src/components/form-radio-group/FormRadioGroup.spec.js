import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormRadioGroup from '@/components/form-radio-group/FormRadioGroup.vue';

describe('FormRadioGroup', () => {
  it('should emit a radioChange event with the default value on mount', async () => {
    const defaultValue = 'default-value';
    const wrapper = mount(FormRadioGroup, {
      props: {
        options: [],
        radioValue: '',
        defaultValue,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('radioChange')).toBeTruthy();
    expect(wrapper.emitted('radioChange')[0][0]).toBe(defaultValue);
  });

  it('should emit a radioChange event when the selected radio button changes', async () => {
    const options = [
      { id: 'option1', title: 'Option 1' },
      { id: 'option2', title: 'Option 2' },
    ];
    const wrapper = mount(FormRadioGroup, {
      props: {
        options,
        radioValue: 'anyRadioValue',
        defaultValue: options[0].id,
      },
    });

    const radioButtons = wrapper.findAll('input[type="radio"]');
    const secondRadioButton = radioButtons[1];

    await secondRadioButton.trigger('change');
    expect(wrapper.emitted('radioChange')).toBeTruthy();
    expect(wrapper.emitted('radioChange')[1][0]).toBe(options[1].id);
  });
});
