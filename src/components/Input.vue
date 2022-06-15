<template>
  <div class="input">
    <input
      type="text"
      :class="['input__field', { active: showDialog }]"
      id="input-field"
      :placeholder="placeholder"
      @click="$emit('click-input')"
    />
    <font-awesome-icon icon="fa-solid fa-caret-down" class="input__icon" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    placeholder: String,
    showDialog: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: inline-block;
  position: relative;
  width: 100%;

  &__field {
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    padding: 16px 10px;
    padding-right: 32px;
    background: #ffffff;
    border: 1px solid $secondary-color;
    border-radius: $border-radius;
    transition: all 0.25s ease-in-out;

    &:focus-visible {
      border: 1px solid $primary-color;
      box-shadow: 0px 0px 8px rgba(0, 123, 195, 0.32);
      outline: none;
    }
  }

  .active {
    border: 1px solid $primary-color;
    box-shadow: 0px 0px 8px rgba(0, 123, 195, 0.32);
    outline: none;
  }

  &__icon {
    float: right;
    position: absolute;
    top: 18px;
    right: 16px;
    font-size: 10px;
    color: #666666;
  }
}
</style>
