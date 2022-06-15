<template>
  <button :class="['button', `button__${variant}`]"><slot></slot></button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding: 4px 19px;
  border-radius: $border-radius;
  border: none;
  line-height: 24px;
  font-weight: 600;
  cursor: pointer;
  color: #ffffff;
  user-select: none;

  &__primary {
    background-color: $primary-color;
  }

  &__text {
    background-color: transparent;
    color: $primary-color;
    &:hover {
      text-decoration: underline;
    }
  }

  &__disabled {
    background-color: #dcdcdc;
    pointer-events: none;
  }
}
</style>
