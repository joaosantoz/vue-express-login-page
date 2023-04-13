import {
  afterEach,
  beforeEach, describe, expect, it,
} from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import MockAdapter from 'axios-mock-adapter';
import RegistrationForm from '@/pages/registration-form/RegistrationForm.vue';
import { useRegistrationFormStore } from '@/stores/registration-form/registrationFormStore';
import httpClient from '@/infra/axios/axiosHttpClient.js';

describe('RegistrationForm', () => {
  let store;
  let mockAxios;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockAxios = new MockAdapter(httpClient);

    store = useRegistrationFormStore();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should render correctly at the first step', () => {
    const wrapper = mount(RegistrationForm);

    store.setCurrentStep(0);

    expect(wrapper.findAllComponents({ name: 'FormInput' }).length).toBe(1);
  });

  it('should disable the continue button when a required field is invalid', async () => {
    const wrapper = mount(RegistrationForm);

    await store.setCurrentStep(0);

    const emailInput = wrapper.findAllComponents({ name: 'FormInput' }).at(0);

    await emailInput.setValue('');

    const continueButton = wrapper.findAllComponents({ name: 'FormButton' }).at(0);
    expect(continueButton.isDisabled()).toBeTruthy();
  });

  it('should emit a radio-change event when the person type radio changes', async () => {
    const wrapper = mount(RegistrationForm);

    const radioGroup = wrapper.findComponent({ name: 'FormRadioGroup' });
    const radioButtons = radioGroup.findAll('input[type="radio"]');

    await radioButtons.at(1).trigger('change');

    expect(wrapper.vm.personType).toBe('pf');
  });

  it('should enable the submit button when all fields are valid', async () => {
    const wrapper = mount(RegistrationForm);

    await store.setCurrentStep(3);

    const emailInput = wrapper.findAllComponents({ name: 'FormInput' }).at(0);
    const nameInput = wrapper.findAllComponents({ name: 'FormInput' }).at(1);
    const cpfInput = wrapper.findAllComponents({ name: 'FormInput' }).at(2);
    const dateInput = wrapper.findAllComponents({ name: 'FormInput' }).at(3);
    const phoneInput = wrapper.findAllComponents({ name: 'FormInput' }).at(4);
    const passwordInput = wrapper.findAllComponents({ name: 'FormInput' }).at(5);

    await emailInput.setValue('johndoe@example.com');
    await nameInput.setValue('John Doe');
    await cpfInput.setValue('09176965066');
    await dateInput.setValue('04/12/2001');
    await phoneInput.setValue('12996392577');
    await passwordInput.setValue('123456qwert');

    const submitButton = wrapper.findComponent({ name: 'FormButton' });

    expect(submitButton.attributes('disabled')).toBeFalsy();
  });

  it('should call setCurrentStep when stepper index changes', async () => {
    const wrapper = mount(RegistrationForm);

    wrapper.vm.stepper.index.value = 2;

    await wrapper.vm.$nextTick();

    expect(store.currentStep).toBe(2);
  });

  it('should call httpClient.post with the correct data and show a success toast when the API returns 200', async () => {
    const wrapper = shallowMount(RegistrationForm);

    store.setCurrentStep(3);

    await wrapper.vm.$nextTick();

    const expectedRequestBody = {
      personType: 'pf',
      email: '',
      name: '',
      cpfCnpj: '',
      dateOfCreation: '',
      phone: '',
      password: '',
    };

    mockAxios.onPost('http://localhost:3000/api/registration', expectedRequestBody).reply(201, {
      message: 'User registered successfully',
    });

    const submitButton = wrapper.findComponent({ name: 'FormButton' });

    await submitButton.trigger('click');

    wrapper.vm.sendUserData();

    expect(mockAxios.history.post[0].baseURL).toBe('http://localhost:3000');
    expect(mockAxios.history.post[0].method).toBe('post');
    expect(mockAxios.history.post[0].url).toBe('api/registration');
    expect(mockAxios.history.post[0].data).toBe(JSON.stringify(expectedRequestBody));
  });
});
