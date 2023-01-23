import axios from "axios";
import {
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
} from "../constants";
const state = () => ({});

const getters = {};

const actions = {
  async listProductCategories({ commit }) {
    commit(PRODUCT_CATEGORY_LIST_REQUEST);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products/categories"
      );
      commit(PRODUCT_CATEGORY_LIST_SUCCESS, data);
    } catch (error) {
      commit(PRODUCT_CATEGORY_LIST_FAIL, error.message);
    }
  },
};

const mutations = {
  [PRODUCT_CATEGORY_LIST_REQUEST]: (state) => {
    state.loading = true;
  },
  [PRODUCT_CATEGORY_LIST_SUCCESS]: (state, categories) => {
    state.loading = false;
    state.categories = categories;
  },
  [PRODUCT_CATEGORY_LIST_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
