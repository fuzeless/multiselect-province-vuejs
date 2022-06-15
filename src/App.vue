<template>
  <Input
    placeholder="Chọn tỉnh thành"
    @click-input="handleInputClick"
    :showDialog="this.$store.state.showDialog"
  />
  <FormSelect
    :options="this.provinces"
    nameKey="name"
    indexKey="code"
    v-if="this.$store.state.showDialog"
  />
  <SelectChips />
</template>

<script>
import Input from './components/Input.vue';
import FormSelect from './components/FormSelect.vue';
import SelectChips from './components/SelectChips.vue';

export default {
  name: 'App',
  computed: {
    provinces() {
      return this.$store.getters.getAllProvincesWithCode;
    },
  },
  mounted() {
    this.$store.dispatch('getProvinces');
  },
  components: {
    Input,
    FormSelect,
    SelectChips,
  },
  methods: {
    handleInputClick() {
      this.$store.dispatch('setShowDialog', !this.$store.state.showDialog);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 480px;
  margin: 96px auto;
}
</style>
