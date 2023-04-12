<script setup>
import { vMaska } from 'maska';
import { computed } from 'vue';
import { useRegistrationFormStore } from '@/stores/registration-form/registrationFormStore';
import requiredValidator from '@/validation/required/requiredValidator.js';
import emailValidator from '@/validation/email/emailValidator.js';
import cpfCnpjValidator from '@/validation/cpf-cnpj/cpfCnpjValidator';
import dateValidator from '@/validation/date/dateValidator.js';

const store = useRegistrationFormStore();

const props = defineProps({
  fieldOptions: {
    type: Object,
    required: true,
  },
});

const fieldOptions = computed(() => props.fieldOptions);

const inputMask = computed(() => {
  return {
    cpf: '###.###.###-##',
    cnpj: '##.###.###/####-##',
    date: '##/##/####',
    phone: '(##) #########',
  }[fieldOptions.value.mask];
});

const buildValidators = (validatorName, content) => {
  const additionalValidators = {
    cpfCnpj: cpfCnpjValidator(store.personType, content),
    email: emailValidator(content),
    date: dateValidator(content),
  };

  return additionalValidators[validatorName];
};

const validateInputContent = () => {
  const requiredValidation = requiredValidator(fieldOptions.value.content);

  if (fieldOptions.value.additionalValidator) {
    const additionalValidation = buildValidators(
      fieldOptions.value.additionalValidator,
      fieldOptions.value.content,
    );

    fieldOptions.value.isValid = !additionalValidation && !requiredValidation;
    fieldOptions.value.errorMessage = additionalValidation || requiredValidation;

    return;
  }

  fieldOptions.value.errorMessage = requiredValidation;
  fieldOptions.value.isValid = !requiredValidation;
};

</script>

<template>
  <div
    class="form-input-wrapper"
    v-if="fieldOptions"
  >
    <label class="input-title">{{ fieldOptions?.title }}</label>
    <input
      v-maska
      :data-maska="inputMask"
      class="form-input"
      type="text"
      v-model="fieldOptions.content"
      @input="validateInputContent()"
    >
    <span
      class="error-message"
      v-show="!fieldOptions.isValid"
      v-if="fieldOptions.errorMessage"
    >{{ fieldOptions.errorMessage }}</span>
  </div>
</template>

<style lang="scss" scoped>
.form-input-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1em;

  .input-title {
    width: 100%;
  }

  .form-input {
    margin-top: 0.5em;
    width: 100%;
    height: 2.5em;
    border: 1px solid $color-grey;
    border-radius: 0.5em;
    padding: 0.25em;
  }

  .error-message {
    position: absolute;
    bottom: -1.5em;
    right: 0;
    font-size: 0.7em;
    letter-spacing: 1px;
    color: #ff3333;
    transition: 0.3s ease all;
  }
}
</style>
