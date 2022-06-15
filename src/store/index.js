import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    provinces: [
      {
        code: '',
        name: '',
      },
    ],
    selected: [],
    // Preselect state is used to store province when user click on a province,
    // but not confirming the choice
    preselected: [],
    showDialog: false,
    query: '',
  },
  getters: {
    getAllProvincesWithCode: (state) => state.provinces.map((province) => ({
      name: province.name,
      code: province.code,
    })),
    getSelectedProvinces: (state) => (
      state.provinces.filter((province) => state.selected.includes(province.code.toString()))
    ),
    getPreSelectedProvinces: (state) => state.preselected,
    getProvinceNameByCode: (state) => (code) => (
      state.provinces.filter((province) => province.code === code)[0].name
    ),
    isProvinceSelected: (state) => (code) => state.selected.includes(code),
    isProvincePreSelected: (state) => (code) => state.preselected.includes(code),
    isPreSelectedEmpty: (state) => state.preselected.length === 0,
    getShowDialog: (state) => state.showDialog,
    getQuery: (state) => state.query,
  },
  mutations: {
    setProvinces(state, provinces) {
      state.provinces = provinces;
    },
    addSelectedProvince(state, code) {
      state.selected.push(code);
    },
    removeSelectedProvince(state, code) {
      state.selected = state.selected.filter(
        (selectedCode) => selectedCode.toString() !== code.toString(),
      );
    },
    setSelectedProvince(state, newVal) {
      // Use push to prevent shallow copy of 2 states.
      state.selected = [];
      newVal.forEach((code) => {
        state.selected.push(code);
      });
    },
    addPreSelectedProvince(state, code) {
      state.preselected.push(code);
    },
    removePreSelectedProvince(state, code) {
      state.preselected = state.preselected.filter(
        (selectedCode) => selectedCode.toString() !== code.toString(),
      );
    },
    setPreSelectedProvince(state, newVal) {
      state.preselected = newVal;
    },
    setShowDialog(state, showDialog) {
      state.showDialog = showDialog;
    },
    setQuery(state, query) {
      state.query = query;
    },
  },
  actions: {
    async getProvinces({ commit }) {
      const response = await axios.get('https://provinces.open-api.vn/api/');
      if (response && response.status === 200) {
        commit('setProvinces', response.data);
      }
    },
    handleSelectProvince({ commit }, { code, checked }) {
      if (checked) {
        commit('addSelectedProvince', code);
      } else {
        commit('removeSelectedProvince', code);
      }
    },
    handlePreSelectProvince({ commit }, { code, checked }) {
      if (checked) {
        commit('addPreSelectedProvince', code);
      } else {
        commit('removePreSelectedProvince', code);
      }
    },
    handleConfirmSelection({ commit, state }) {
      commit('setSelectedProvince', state.preselected);
    },
    handleCancelSelection({ commit, state }) {
      commit('setPreSelectedProvince', state.selected);
    },
    handleDeleteSelected({ commit }, code) {
      commit('removeSelectedProvince', code);
      commit('removePreSelectedProvince', code);
    },
    setShowDialog({ commit }, showDialog) {
      commit('setShowDialog', showDialog);
    },
    setQuery({ commit }, query) {
      commit('setQuery', query);
    },
  },
  modules: {
  },
});
