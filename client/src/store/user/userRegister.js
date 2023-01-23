import axios from "axios";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants";

const state = () => ({});

const getters = {};

const actions = {
  async register({ commit }, { name, email, password }) {
    commit(USER_REGISTER_REQUEST);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      commit(USER_REGISTER_SUCCESS, data);
      commit("userSignin/USER_SIGNIN_SUCCESS", data, { root: true });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      commit(
        USER_REGISTER_FAIL,
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
};

const mutations = {
  [USER_REGISTER_REQUEST]: (state) => {
    state.error = null;
    state.userInfo = null;
    state.loading = true;
  },
  [USER_REGISTER_SUCCESS]: (state, userInfo) => {
    state.loading = false;
    state.userInfo = userInfo;
  },
  [USER_REGISTER_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
