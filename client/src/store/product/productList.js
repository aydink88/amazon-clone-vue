import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants";
const state = () => ({});

const getters = {};

const actions = {
  async listProducts(
    { commit },
    {
      pageNumber = "",
      seller = "",
      name = "",
      category = "",
      order = "",
      min = 0,
      max = 0,
      rating = 0,
    }
  ) {
    commit(PRODUCT_LIST_REQUEST);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
      );
      commit(PRODUCT_LIST_SUCCESS, data);
    } catch (error) {
      commit(PRODUCT_LIST_FAIL, error.message);
    }
  },
};

const mutations = {
  [PRODUCT_LIST_REQUEST]: (state) => {
    state.loading = true;
  },
  [PRODUCT_LIST_SUCCESS]: (state, payload) => {
    state.loading = false;
    state.products = payload.products;
    state.pages = payload.pages;
    state.page = payload.page;
  },
  [PRODUCT_LIST_FAIL]: (state, error) => {
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
