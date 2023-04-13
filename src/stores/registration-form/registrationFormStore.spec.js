import {
  describe, expect, beforeEach, it,
} from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useRegistrationFormStore } from '@/stores/registration-form/registrationFormStore';

describe('useRegistrationFormStore', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());

    store = useRegistrationFormStore();
  });

  it('should set personType correctly', () => {
    store.setPersonType('pf');
    expect(store.personType).toEqual('pf');
  });

  it('should set currentStep correctly', () => {
    store.setCurrentStep(1);
    expect(store.currentStep).toEqual(1);
  });

  it('should return correct field name based on personType', () => {
    expect(store.fieldNameByPersonType('name')).toEqual('Nome');
    store.setPersonType('pj');
    expect(store.fieldNameByPersonType('name')).toEqual('Razão social');
  });

  it('should return correct form based on currentStep and personType', () => {
    const formStep0 = store.registrationFormBase[0];
    const formStep1 = store.registrationFormBase[1];
    const formStep2 = store.registrationFormBase[2];

    expect(formStep0).toBeInstanceOf(Object);
    expect(formStep0[0]).toHaveProperty('title', 'Endereço de email');
    expect(formStep0[0].title).toBe('Endereço de email');

    store.setPersonType('pf');
    store.setCurrentStep(1);

    expect(formStep1).toHaveLength(4);
    expect(formStep1[0].title).toBe('Nome');
    expect(formStep1[1].title).toBe('CPF');
    expect(formStep1[2].title).toBe('Data de nascimento');
    expect(formStep1[3].title).toBe('Telefone');

    store.setCurrentStep(2);

    expect(formStep2).toHaveLength(1);
    expect(formStep2[0].title).toBe('Senha');
  });

  it('should return correct personTypeTitle', () => {
    store.setPersonType('pf');
    expect(store.personTypeTitle).toEqual('Pessoa Física');

    store.setPersonType('pj');
    expect(store.personTypeTitle).toEqual('Pessoa Jurídica');
  });

  it('returns the correct form for currentStep 0 and personType pf', () => {
    store.setPersonType('pf');
    store.setCurrentStep(0);

    const expectedForm = [
      {
        title: 'Endereço de email',
        additionalValidator: 'email',
        content: '',
        isValid: false,
        errorMessage: '',
      },
    ];

    expect(store.form).toEqual(expectedForm);
  });

  it('returns the correct form for currentStep 0 and personType pj', () => {
    store.setPersonType('pj');
    store.setCurrentStep(0);

    const expectedForm = [
      {
        title: 'Endereço de email',
        additionalValidator: 'email',
        content: '',
        isValid: false,
        errorMessage: '',
      },
    ];

    expect(store.form).toEqual(expectedForm);
  });

  it('returns the correct form for currentStep 1 and personType pf', () => {
    store.setPersonType('pf');
    store.setCurrentStep(1);

    const expectedForm = [
      {
        title: 'Nome',
        content: '',
        isValid: false,
        errorMessage: '',
      },
      {
        title: 'CPF',
        additionalValidator: 'cpfCnpj',
        content: '',
        isValid: false,
        errorMessage: '',
        mask: 'cpf',
      },
      {
        title: 'Data de nascimento',
        additionalValidator: 'date',
        content: '',
        isValid: false,
        errorMessage: '',
        mask: 'date',
      },
      {
        title: 'Telefone',
        content: '',
        isValid: false,
        errorMessage: '',
        mask: 'phone',
      },
    ];

    expect(store.form).toEqual(expectedForm);
  });

  it('returns the correct form for currentStep 1 and personType pj', () => {
    store.setPersonType('pj');
    store.setCurrentStep(1);

    const expectedForm = [
      {
        title: 'Razão social',
        content: '',
        isValid: false,
        errorMessage: '',
      },
      {
        title: 'CNPJ',
        additionalValidator: 'cpfCnpj',
        content: '',
        isValid: false,
        errorMessage: '',
        mask: 'cnpj',
      },
      {
        title: 'Data de abertura',
        additionalValidator: 'date',
        content: '',
        isValid: false,
        errorMessage: '',
        mask: 'date',
      },
      {
        title: 'Telefone',
        content: '',
        isValid: false,
        errorMessage: '',
        mask: 'phone',
      },
    ];

    expect(store.form).toEqual(expectedForm);
  });

  it('returns the correct form for currentStep 2 and personType pf', () => {
    store.setPersonType('pf');
    store.setCurrentStep(2);

    const expectedForm = [
      {
        title: 'Senha',
        content: '',
        isValid: false,
        errorMessage: '',
        inputType: 'password',
      },
    ];

    expect(store.form).toEqual(expectedForm);
  });

  it('should return correct form based on currentStep and personType when currentStep is 3', () => {
    store.setCurrentStep(3);

    const formStep3 = store.form;

    expect(formStep3).toHaveLength(6);
    expect(formStep3[0].title).toEqual('Endereço de email');
    expect(formStep3[1].title).toEqual('Nome');
    expect(formStep3[2].title).toEqual('CPF');
    expect(formStep3[3].title).toEqual('Data de nascimento');
    expect(formStep3[4].title).toEqual('Telefone');
    expect(formStep3[5].title).toEqual('Senha');
  });
});
