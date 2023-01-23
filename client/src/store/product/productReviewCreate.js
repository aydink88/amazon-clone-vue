import axios from "axios";
import {
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
} from "../constants";
const state = () => ({});

const getters = {};

const actions = {
  async createReview({ commit, rootState }, { productId, review }) {
    commit(PRODUCT_REVIEW_CREATE_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/products/" + productId + "/reviews",
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      commit(PRODUCT_REVIEW_CREATE_SUCCESS, data.review);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(PRODUCT_REVIEW_CREATE_FAIL, message);
    }
  },
};

const mutations = {
  [PRODUCT_REVIEW_CREATE_REQUEST]: (state) => {
    state.loading = true;
  },
  [PRODUCT_REVIEW_CREATE_SUCCESS]: (state, review) => {
    state.loading = false;
    state.success = true;
    state.review = review;
  },
  [PRODUCT_REVIEW_CREATE_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [PRODUCT_REVIEW_CREATE_RESET]: (state) => {
    state.loading = false;
    state.success = false;
    state.error = null;
    state.review = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
