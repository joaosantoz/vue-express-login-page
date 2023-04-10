<script setup>
import { useStepper } from '@vueuse/core'
import { useRegistrationFormStore } from '@/stores/registrationForm';
import { computed, ref, watch } from "vue";

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

watch(stepper.index, () => {
  store.setCurrentStep(stepper.index.value);
})

</script>

<template>
  <h1>{{ stepper.index }}</h1>

    <h1>{{ store.personType }}</h1>
  
    <input id="pf" type="radio" value="pf" name="person" v-model="personType" @change="changePersonType()">
    <label for="pf">Pessoa Física</label>

    <input id="pj" type="radio" value="pj" name="person" v-model="personType" @change="changePersonType()">
    <label for="pj">Pessoa Jurídica</label>
    
  <div v-for="field in form">{{ field.title }}</div>
  
  <button @click="stepper.goToPrevious();">prev</button>
  <button @click="stepper.goToNext();">next</button>
</template>