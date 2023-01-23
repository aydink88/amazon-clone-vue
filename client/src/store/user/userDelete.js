import axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
} from "../constants";

//factory function to reset state
const defaultState = () => ({ success: null, error: null, loading: null });

const state = defaultState();

const getters = {};

const actions = {
  async deleteUser({ commit, rootState }, userId) {
    commit(USER_DELETE_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      commit(USER_DELETE_SUCCESS);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(USER_DELETE_FAIL, message);
    }
  },
};

const mutations = {
  [USER_DELETE_REQUEST]: (state) => {
    state.success = false;
    state.error = "";
    state.loading = true;
  },
  [USER_DELETE_SUCCESS]: (state) => {
    state.loading = false;
    state.success = true;
  },
  [USER_DELETE_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [USER_DELETE_RESET]: (state) => {
    Object.assign(state, defaultState());
  },
};

export default { namespaced: true, state, getters, actions, mutations };
