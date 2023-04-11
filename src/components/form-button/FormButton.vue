<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  variation: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['buttonClicked']);

const emitEventButtonClicked = () => {
  emit('buttonClicked');
};

</script>

<template>
  <button
    class="form-button"
    :class="props.variation"
    @click="emitEventButtonClicked()"
  >
    {{ props.title }}
  </button>
</template>

<style lang="scss" scoped>
.form-button {
  outline: none;
  border: none;
  border-radius: 0.5em;
  width: 100%;
  height: 2.5em;
  cursor: pointer;
  transition: 0.2s transform ease, 0.2s background ease;

  &:hover:enabled {
    color: $color-white;
    background: lighten($color-primary, 10);
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  &.primary {
    background: $color-primary;
    color: $color-white;
  }

  &.secondary {
    background: $color-white;
    border: 1px solid $color-primary;
    color: $color-primary;

    &:hover:enabled {
      background: $color-white;
      color: $color-primary;
      border: 2px solid $color-primary;
      //transform: none;
      //box-shadow: none;
    }
  }

  &:disabled {
    cursor: default;
    background: lighten($color-grey, 40);
  }
}
</style>
