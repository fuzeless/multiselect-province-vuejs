<template>
  <div class="select">
    <VuePerfectScrollbar class="select__scrollbar">
      <label
        class="select__item"
        v-for="option in filteredList"
        :key="option[indexKey]"
        :for="option[indexKey]"
      >
        <input
          type="checkbox"
          :id="option[indexKey]"
          @change="handleCheck"
          :value="option[indexKey]"
          v-model="selected"
          :checked="this.selected.includes(option[indexKey])"
        />
        <span class="checkmark"></span>
        {{ option[nameKey] }}
      </label>
    </VuePerfectScrollbar>
    <div class="select__buttons">
      <Button
        :variant="
          this.$store.getters.isPreSelectedEmpty ? 'disabled' : 'primary'
        "
        @click="handleButtonClick('select')"
        >Đồng ý</Button
      >
      <Button variant="text" @click="handleButtonClick('cancel')">Huỷ</Button>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar/index.vue';

import Button from './Button.vue';

export default {
  name: 'FormSelect',
  components: {
    VuePerfectScrollbar,
    Button,
  },
  computed: {
    selected: {
      get() {
        return this.$store.getters.getPreSelectedProvinces;
      },
      set() {
        this.$store.commit('setPreSelectedProvince', this.selected);
      },
    },
    query: {
      get() {
        return this.$store.getters.getQuery;
      },
      set(query) {
        this.$store.dispatch('setQuery', query);
      },
    },
    filteredList() {
      return this.options.filter(
        (option) => option[this.nameKey].toLowerCase().includes(this.query.toLowerCase()),
      );
    },
  },
  props: {
    options: Array,
    nameKey: String,
    indexKey: String,
  },
  methods: {
    handleCheck(event) {
      const { id, checked } = event.target;
      this.$store.dispatch('handlePreSelectProvince', { code: id, checked });
    },
    handleButtonClick(action) {
      switch (action) {
        case 'select':
          this.$store.dispatch('handleConfirmSelection');
          this.$store.dispatch('setShowDialog', false);
          break;
        case 'cancel':
          this.$store.dispatch('handleCancelSelection');
          this.$store.dispatch('setShowDialog', false);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$common-padding: 16px;

.select {
  height: 304px;
  /* overflow-y: auto; */
  /* box-sizing: border-box; */
  border-radius: $border-radius;
  box-shadow: 0px 1px 8px rgba(102, 102, 102, 0.2);

  &__scrollbar {
    height: 80%;
  }
  &__buttons {
    max-height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 16px;
  }

  &__item {
    display: block;
    position: relative;
    padding: 10px 0 10px 48px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:first-child {
      margin-top: calc($common-padding / 2);
    }
    &:last-child {
      margin-bottom: calc($common-padding / 2);
    }

    &:hover {
      background-color: #e7f1fd;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark {
        background-color: $green;
        border: 1px solid $green;
        &:after {
          display: block;
        }
      }
    }

    /* Custom checkbox */
    .checkmark {
      position: absolute;
      top: 12px;
      left: 20px;
      height: 16px;
      width: 16px;
      background-color: #ffffff;
      border: 1px solid #666666;
      border-radius: $border-radius;

      /* Create the checkmark/indicator (hidden when not checked) */
      &:after {
        content: '';
        position: absolute;
        display: none;

        /* Checkmark styling */
        left: 5.5px;
        top: 3px;
        width: 3px;
        height: 6px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
}
</style>
