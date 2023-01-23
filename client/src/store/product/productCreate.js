import axios from "axios";
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} from "../constants";
const state = () => ({});

const getters = {};

const actions = {
  async createProduct({ commit, rootState }) {
    commit(PRODUCT_CREATE_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      commit(PRODUCT_CREATE_SUCCESS, data.product);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(PRODUCT_CREATE_FAIL, message);
    }
  },
};

const mutations = {
  [PRODUCT_CREATE_REQUEST]: (state) => {
    state.loading = true;
  },
  [PRODUCT_CREATE_SUCCESS]: (state, product) => {
    state.loading = false;
    state.success = true;
    state.product = product;
  },
  [PRODUCT_CREATE_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [PRODUCT_CREATE_RESET]: (state) => {
    state.loading = false;
    state.success = false;
    state.product = null;
    state.error = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
