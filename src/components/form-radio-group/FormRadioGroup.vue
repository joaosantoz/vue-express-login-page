<script setup>
import { onMounted, ref } from 'vue';

const radioValue = ref('');
const emit = defineEmits(['radioChange']);

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  radioValue: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: String,
    required: false,
    default: '',
  },
});

const radioValueChanged = () => {
  emit('radioChange', radioValue.value);
};

onMounted(() => {
  emit('radioChange', props.defaultValue);
  radioValue.value = props.defaultValue;
});

</script>

<template>
  <div class="form-radio-group">
    <div
      v-for="(option, index) in props.options"
      :key="index"
    >
      <input
        :id="option.id"
        type="radio"
        :value="option.id"
        name="person"
        v-model="radioValue"
        @change="radioValueChanged()"
      >
      <label :for="option.id">{{ option.title }}</label>
    </div>
  </div>
</template>

<style lang="scss">
.form-radio-group {
  max-width: 280px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.8em;

  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid $color-grey;
    outline: none;
    cursor: pointer;
    margin-right: 0.25em;

    &::before {
      content: '';
      height: 7px;
      width: 7px;
      border: 1px solid $color-grey;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  input[type="radio"]:checked {
    &::before {
      background: $color-grey;
    }
  }

  label {
    cursor: pointer;
  }
}

</style>
