<template>
  <div class="chips">
    <div class="chips__item" v-for="province of provinces" :key="province.code">
      <div class="chips__name">{{ province.name }}</div>
      <font-awesome-icon
        icon="fa-solid fa-x"
        class="chips__delete-icon"
        @click="handleDeleteSelected(province.code)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectChips',
  computed: {
    provinces() {
      return this.$store.getters.getSelectedProvinces;
    },
  },
  methods: {
    handleDeleteSelected(code) {
      this.$store.dispatch('handleDeleteSelected', code);
    },
  },
};
</script>

<style lang="scss" scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  padding: 8px;
  gap: 4px;
  box-sizing: border-box;
  border: 1px solid $secondary-color;
  border-radius: $border-radius;

  &__item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
    background: #f8f8f8;
    border-radius: 32px;
  }
  &__name {
    padding: 0 16px;
  }
  &__delete-icon {
    width: 11px;
    height: 11px;
    padding-right: 10.5px;
    color: #666666;
    cursor: pointer;
  }
}
</style>
