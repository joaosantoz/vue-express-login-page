import {
  beforeEach, describe, expect, it,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import FormInput from '@/components/form-input/FormInput.vue';

describe('FormInput', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render the correct label', () => {
    const wrapper = shallowMount(FormInput, {
      props: {
        fieldOptions: {
          title: 'Name',
          mask: 'none',
          content: '',
        },
      },
    });

    expect(wrapper.find('.input-title').text()).toEqual('Name');
  });

  it('should set the correct input mask', () => {
    const wrapper = shallowMount(FormInput, {
      props: {
        fieldOptions: {
          title: 'CPF',
          mask: 'cpf',
          content: '',
        },
      },
    });

    expect(wrapper.find('input').attributes('data-maska')).toEqual('###.###.###-##');
  });

  it('should validate required fields', () => {
    const wrapper = shallowMount(FormInput, {
      props: {
        fieldOptions: {
          title: 'Email',
          mask: 'none',
          content: '',
        },
      },
    });

    expect(wrapper.vm.fieldOptions.isValid).toBeFalsy();

    wrapper.find('input').setValue('test@test.com');
    wrapper.find('input').trigger('input');

    expect(wrapper.vm.fieldOptions.isValid).toBeTruthy();
  });

  it('should validate additional fields when invalid input', () => {
    const wrapper = shallowMount(FormInput, {
      props: {
        fieldOptions: {
          title: 'CPF',
          mask: 'cpf',
          content: '',
          additionalValidator: 'cpfCnpj',
        },
      },
    });

    expect(wrapper.vm.fieldOptions.isValid).toBeFalsy();

    wrapper.find('input').setValue('11111111111');
    wrapper.find('input').trigger('input');

    expect(wrapper.vm.fieldOptions.isValid).toBeFalsy();
  });

  it('should validate additional fields when valid input', () => {
    const wrapper = shallowMount(FormInput, {
      props: {
        fieldOptions: {
          title: 'CPF',
          mask: 'cpf',
          content: '',
          additionalValidator: 'cpfCnpj',
        },
      },
    });

    expect(wrapper.vm.fieldOptions.isValid).toBeFalsy();

    wrapper.find('input').setValue('51764263073');
    wrapper.find('input').trigger('input');

    expect(wrapper.vm.fieldOptions.isValid).toBeTruthy();
  });

  it('should validate additional fields when both validators acting and one input invalid', () => {
    const wrapper = shallowMount(FormInput, {
      props: {
        fieldOptions: {
          title: 'CPF',
          mask: 'cpf',
          content: '',
          additionalValidator: 'cpfCnpj',
        },
      },
    });

    expect(wrapper.vm.fieldOptions.isValid).toBeFalsy();

    wrapper.find('input').setValue('');
    wrapper.find('input').trigger('input');

    expect(wrapper.vm.fieldOptions.isValid).toBeFalsy();
  });
});
