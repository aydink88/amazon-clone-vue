import axios from "axios";
import {
  USER_TOPSELLERS_LIST_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
} from "../constants";

const state = () => ({});

const getters = {};

const actions = {
  async listTopSellers({ commit }) {
    commit(USER_TOPSELLERS_LIST_REQUEST);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/top-sellers"
      );
      commit(USER_TOPSELLERS_LIST_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(USER_TOPSELLERS_LIST_FAIL, message);
    }
  },
};

const mutations = {
  [USER_TOPSELLERS_LIST_REQUEST]: (state) => {
    state.error = null;
    state.users = null;
    state.loading = true;
  },
  [USER_TOPSELLERS_LIST_SUCCESS]: (state, users) => {
    state.loading = false;
    state.users = users;
  },
  [USER_TOPSELLERS_LIST_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
