<script setup>
import { useStepper } from '@vueuse/core'
import { useRegistrationFormStore } from '@/stores/registration-form/registrationForm';
import { computed, ref, watch } from "vue";
import FormInput from "@/components/form-input/FormInput.vue";

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
    title: 'Revise suas informações'
  }
})

const form = computed(() => store.form);

const personType = ref(store.personType);

const changePersonType = () => {
  store.setPersonType(personType.value);
}

const currentFormIsValid = computed(() => {
  return form.value.map((field) => field.isValid).every((itemValid) => itemValid);
})

watch(stepper.index, () => {
  store.setCurrentStep(stepper.index.value);
})

</script>

<template>
  <h1>{{ stepper.index }}</h1>

  <h1>{{ store.personType }}</h1>

  <div>
    <FormInput v-for="(field, index) in form" :key="index" :fieldOptions="field"></FormInput>
  </div>

  <div v-if="stepper.isFirst.value">
    <input id="pf" type="radio" value="pf" name="person" v-model="personType" @change="changePersonType()">
    <label for="pf">Pessoa Física</label>

    <input id="pj" type="radio" value="pj" name="person" v-model="personType" @change="changePersonType()">
    <label for="pj">Pessoa Jurídica</label>
  </div>

  <p>{{ JSON.stringify(form, null, 4) }}</p>

  <p>{{ currentFormIsValid }}</p>

  <button @click="stepper.goToPrevious()" v-if="!stepper.isFirst.value">prev</button>
  <button @click="stepper.goToNext()" v-if="!stepper.isLast.value" :disabled="!currentFormIsValid">next</button>
</template>
