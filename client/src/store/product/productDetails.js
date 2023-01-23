import axios from "axios";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants";
const state = () => ({});

const getters = {};

const actions = {
  async getProductDetails({ commit }, productId) {
    commit(PRODUCT_DETAILS_REQUEST);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      commit(PRODUCT_DETAILS_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(PRODUCT_DETAILS_FAIL, message);
    }
  },
};

const mutations = {
  [PRODUCT_DETAILS_REQUEST]: (state) => {
    state.loading = true;
  },
  [PRODUCT_DETAILS_SUCCESS]: (state, product) => {
    state.loading = false;
    state.product = product;
  },
  [PRODUCT_DETAILS_FAIL]: (state, error) => {
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
