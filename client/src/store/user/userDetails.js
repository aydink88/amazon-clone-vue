import axios from "axios";

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
} from "../constants";

const defaultState = () => ({ user: null, loading: null, error: null });

const state = defaultState();

const getters = {};

const actions = {
  async getUserDetails({ commit, rootState }, userId) {
    commit(USER_DETAILS_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      commit(USER_DETAILS_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(USER_DETAILS_FAIL, message);
    }
  },
};

const mutations = {
  [USER_DETAILS_REQUEST]: (state) => {
    state.user = null;
    state.error = null;
    state.loading = true;
  },
  [USER_DETAILS_SUCCESS]: (state, user) => {
    state.loading = false;
    state.user = user;
  },
  [USER_DETAILS_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [USER_DETAILS_RESET]: (state) => {
    Object.assign(state, defaultState());
  },
};

export default { namespaced: true, state, getters, actions, mutations };
