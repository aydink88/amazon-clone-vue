import axios from "axios";
import {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from "../constants";
const state = () => ({});

const getters = {};

const actions = {
  async updateProduct({ commit, rootState }, product) {
    commit(PRODUCT_UPDATE_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/products/" + product._id,
        product,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      commit(PRODUCT_UPDATE_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(PRODUCT_UPDATE_FAIL, message);
    }
  },
};

const mutations = {
  [PRODUCT_UPDATE_REQUEST]: (state) => {
    state.loading = true;
  },
  [PRODUCT_UPDATE_SUCCESS]: (state) => {
    state.loading = false;
    state.success = true;
  },
  [PRODUCT_UPDATE_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [PRODUCT_UPDATE_RESET]: (state) => {
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
