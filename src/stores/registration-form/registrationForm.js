import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useRegistrationFormStore = defineStore('registrationForm', () => {
  const personType = ref('pf');
  const currentStep = ref(0);
  const setPersonType = (newPersonType) => {
    personType.value = newPersonType;
  };

  const setCurrentStep = (newCurrentStep) => {
    currentStep.value = newCurrentStep;
  };
  const fieldNameByPersonType = (field) => {
    const fieldTitles = {
      name: {
        pf: 'Nome',
        pj: 'Razão social',
      },
      identification: {
        pf: 'CPF',
        pj: 'CNPJ',
      },
      date: {
        pf: 'Data de nascimento',
        pj: 'Data de abertura',
      },
    };

    return fieldTitles[field][personType.value];
  };

  const registrationFormBase = computed(() => reactive([
    [
      {
        title: 'Endereço de email',
        additionalValidator: 'email',
        content: '',
        isValid: false,
      },
    ],
    [
      {
        title: fieldNameByPersonType('name'),
        content: '',
        isValid: false,
      },
      {
        title: fieldNameByPersonType('identification'),
        additionalValidator: 'cpfCnpj',
        content: '',
        isValid: false,
      },
      {
        title: fieldNameByPersonType('date'),
        content: '',
        isValid: false,
      },
      {
        title: 'Telefone',
        content: '',
        isValid: false,
      },
    ],
    [
      {
        title: 'Senha',
        content: '',
        isValid: false,
      },
    ],
  ]));

  const form = computed(() => {
    if (currentStep.value === 3) {
      return registrationFormBase.value.flatMap((field) => field);
    }

    return registrationFormBase.value[currentStep.value];
  });

  const personTypeTitle = computed(() => ({
    pf: 'Pessoa Física',
    pj: 'Pessoa Jurídica',
  }[personType.value]));

  return {
    form, personType, personTypeTitle, setPersonType, currentStep, setCurrentStep,
  };
});
