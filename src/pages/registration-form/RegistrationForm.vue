<script setup>
import { useStepper } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useRegistrationFormStore } from '@/stores/registration-form/registrationFormStore';
import FormInput from '@/components/form-input/FormInput.vue';
import FormRadioGroup from '@/components/form-radio-group/FormRadioGroup.vue';
import FormButton from '@/components/form-button/FormButton.vue';
import requiredValidator from '@/validation/required/requiredValidator';
import httpClient from '@/infra/axios/axiosHttpClient';

const toast = useToast();
const store = useRegistrationFormStore();
const form = computed(() => store.form);
const personType = ref(store.personType);

const stepper = useStepper({
  welcome: {
    title: 'Seja bem vindo(a)',
  },
  personalData: {
    title: store.personTypeTitle,
  },
  password: {
    title: 'Senha de acesso',
  },
  review: {
    title: 'Revise suas informações',
  },
});

const personTypeOptions = ref([
  {
    id: 'pf',
    title: 'Pessoa Física',
  },
  {
    id: 'pj',
    title: 'Pessoa Jurídica',
  },
]);

const updateEmailAfterRadioChange = (emailValue) => {
  form.value[0].content = emailValue;

  form.value[0].isValid = !requiredValidator(emailValue);
};
const changePersonType = (newPersonValue) => {
  const previousEmailValue = form.value[0].content;

  store.setPersonType(newPersonValue);
  updateEmailAfterRadioChange(previousEmailValue);
};

const formIsValid = computed(() => form.value.map((item) => item.isValid).every((valid) => valid));

const onlyNumbers = (string) => {
  return string.replace(/\D/g, '');
};

const sendUserData = () => {
  const formData = form.value;

  const requestBody = {
    personType: store.personType,
    email: formData[0].content,
    name: formData[1].content,
    cpfCnpj: onlyNumbers(formData[2].content),
    dateOfCreation: formData[3].content,
    phone: onlyNumbers(formData[4].content),
    password: formData[5].content,
  };

  httpClient.post('api/registration', {
    ...requestBody,
  }).then((response) => {
    toast.open({
      message: response.data.message,
      type: 'success',
    });
  }).catch((error) => {
    if (error.response?.status === 400) {
      toast.open({
        message: error.response.data.error,
        type: 'error',
      });
    } else {
      toast.open({
        message: 'Ocorreu um erro inesperado.',
        type: 'error',
      });
    }
  });
};

watch(stepper.index, () => {
  store.setCurrentStep(stepper.index.value);
});

</script>

<template>
  <div class="form-wrapper">
    <form
      class="registration-form"
      @submit.prevent
    >
      <div class="form-information">
        <p class="form-step">
          Etapa <span class="current-step">{{ stepper?.index.value + 1 }}</span>
          de {{ stepper?.stepNames.value.length }}
        </p>
        <h1 class="form-title">
          {{ stepper?.current.value.title }}
        </h1>
      </div>

      <div class="form-input-group">
        <FormInput
          v-for="(field, index) in form"
          :key="index"
          :field-options="field"
        />
      </div>

      <div
        class="form-radio-group"
        v-if="stepper?.isFirst.value"
      >
        <FormRadioGroup
          @radio-change="changePersonType($event)"
          :options="personTypeOptions"
          :radio-value="personType"
          :default-value="personType"
        />
      </div>

      <div
        class="form-controls-group"
        :class="{ full: stepper?.isFirst.value }"
      >
        <FormButton
          @keydown.enter.prevent
          @button-clicked="stepper?.goToPrevious()"
          v-if="!stepper?.isFirst.value"
          title="Voltar"
          data-test="voltar"
          variation="secondary"
        />
        <FormButton
          @button-clicked="stepper?.goToNext()"
          v-if="!stepper?.isLast.value"
          title="Continuar"
          :disabled="!formIsValid"
          variation="primary"
        />
        <FormButton
          @button-clicked="sendUserData()"
          v-if="stepper?.isLast.value"
          :disabled="!formIsValid"
          title="Cadastrar"
          variation="primary"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  padding: 100px 20px 0 20px;
  max-width: 300px;
  margin: 0 auto;

  @media screen and (max-width: 500px) {
    padding-top: 200px;
  }

  .registration-form {
    width: 100%;
    margin: 0 auto;

    .form-information {
      width: 100%;
      margin-bottom: 1.5em;

      .form-title {
        font-weight: bold;
        font-size: 1.8em;

        @media screen and (min-width: 500px) {
          width: 330px;
        }
      }

      .form-step {
        margin-bottom: 0.25em;

        .current-step {
          color: $color-primary;
        }
      }
    }

    .form-controls-group {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5em;

      > * {
        width: 48%;
      }

      &.full {
        > * {
          width: 100%;
        }
      }
    }
  }
}
</style>
