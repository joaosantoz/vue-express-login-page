<script setup>
import { computed } from 'vue';
import { requiredValidator } from "@/validation/requiredValidator";

const props = defineProps(['fieldOptions']);
const fieldOptions = computed(() => props.fieldOptions);


const validateInputContent = () => {
  fieldOptions.value.isValid = requiredValidator(fieldOptions.value.content);
}

</script>

<template>
  <label>{{ fieldOptions.title }}</label>
  <input type="text" v-model="fieldOptions.content" @input="validateInputContent()">
</template>
