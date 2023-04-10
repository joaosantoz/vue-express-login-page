import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRegistrationFormStore = defineStore('registrationForm', () => {
  const personType = ref('pf');

  const currentStep = ref(0);
  const setPersonType = (newPersonType) => {
    personType.value = newPersonType;
  }

  const setCurrentStep = (newCurrentStep) => {
    currentStep.value = newCurrentStep;
  }
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
      }
    };

    return fieldTitles[field][personType.value];
  }

  const registrationFormBase = computed( () => [
    [
      {
        title: 'Endereço de email',
        validation: ['email', 'required'],
        value: ''
      }
    ],
    [
      {
        title: fieldNameByPersonType('name'),
        validation: ['required'],
        value: ''
      },
      {
        title: fieldNameByPersonType('identification'),
        validation: ['required'],
        value: ''
      },
      {
        title: fieldNameByPersonType('date'),
        validation: ['date', 'required'],
        value: ''
      },
      {
        title: 'Telefone',
        validation: ['phone', 'required'],
        value: ''
      }
    ],
    [
      {
        title: 'Senha',
        validation: ['required'],
        value: ''
      }
    ]
  ]);
  

  const form = computed(() => {
    if (currentStep.value === 3) {
      return registrationFormBase.value.flatMap((field) => field);
    }

    return registrationFormBase.value[currentStep.value];
  })

  const personTypeTitle = computed(() => {
    return {
      pf: 'Pessoa Física',
      pj: 'Pessoa Jurídica'
    }[personType.value]
  })

  return { form, personType, personTypeTitle, setPersonType, currentStep, setCurrentStep }
})
