import axios from "axios";
import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
} from "../constants";
const state = () => ({});

const getters = {};

const actions = {
  async deleteProduct({ commit, rootState }, productId) {
    commit(PRODUCT_DELETE_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      await axios.delete("http://localhost:5000/api/products/" + productId, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      commit(PRODUCT_DELETE_SUCCESS);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(PRODUCT_DELETE_FAIL, message);
    }
  },
};

const mutations = {
  [PRODUCT_DELETE_REQUEST]: (state) => {
    state.loading = true;
  },
  [PRODUCT_DELETE_SUCCESS]: (state) => {
    state.loading = false;
    state.success = true;
  },
  [PRODUCT_DELETE_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [PRODUCT_DELETE_RESET]: (state) => {
    state.loading = false;
    state.success = false;
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
