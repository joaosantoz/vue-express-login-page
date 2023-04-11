<script setup>
import { useStepper } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { useRegistrationFormStore } from '@/stores/registration-form/registrationForm';
import FormInput from '@/components/form-input/FormInput.vue';

const store = useRegistrationFormStore();

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

const form = computed(() => store.form);

const personType = ref(store.personType);

const changePersonType = () => {
  store.setPersonType(personType.value);
};

const formIsValid = computed(() => form.value.map((item) => item.isValid).every((valid) => valid));

watch(stepper.index, () => {
  store.setCurrentStep(stepper.index.value);
});

</script>

<template>
  <form class="registration-form">
    <div class="form-information">
      <p class="form-step">
        Etapa <span class="current-step">{{ stepper.index.value + 1 }}</span>
        de {{ stepper.stepNames.value.length }}
      </p>
      <h1 class="form-title">
        {{ stepper.current.value.title }}
      </h1>
    </div>

    <div>
      <FormInput
        v-for="(field, index) in form"
        :key="index"
        :field-options="field"
      />
    </div>

    <div v-if="stepper.isFirst.value">
      <input
        id="pf"
        type="radio"
        value="pf"
        name="person"
        v-model="personType"
        @change="changePersonType()"
      >
      <label for="pf">Pessoa Física</label>

      <input
        id="pj"
        type="radio"
        value="pj"
        name="person"
        v-model="personType"
        @change="changePersonType()"
      >
      <label for="pj">Pessoa Jurídica</label>
    </div>

    <button
      @click="stepper.goToPrevious()"
      v-if="!stepper.isFirst.value"
    >
      Voltar
    </button>
    <div>
      <button
        @click="stepper.goToNext()"
        v-if="!stepper.isLast.value"
        :disabled="!formIsValid"
      >
        Continuar
      </button>
      <button
        v-if="stepper.isLast.value"
        :disabled="!formIsValid"
      >
        Cadastrar
      </button>
    </div>
  </form>
</template>

<style lang="scss">
.registration-form {
  border: 1px solid tomato;
  max-width: 30%;
  margin: 0 auto;

  .form-information {
    .form-title {
      font-weight: bold;
    }
    .form-step {
      .current-step {
        color: $color-primary;
      }
    }
  }
}
</style>
