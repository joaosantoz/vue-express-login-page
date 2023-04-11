<script setup>
import { computed } from 'vue';
import { requiredValidator } from '@/validation/validators/requiredValidator';

const props = defineProps({
  fieldOptions: {
    type: Object,
    required: true,
  },
});
const fieldOptions = computed(() => props.fieldOptions);

const validateInputContent = () => {
  fieldOptions.value.isValid = !requiredValidator(fieldOptions.value.content);
};

</script>

<template>
  <div class="form-input-wrapper">
    <label class="input-title">{{ fieldOptions.title }}</label>
    <input
      class="form-input"
      type="text"
      v-model="fieldOptions.content"
      @input="validateInputContent()"
    >
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
}
</style>
