import axios from "axios";
import {
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants";

const state = () => ({});

const getters = {};

const actions = {
  async updateUser({ commit, rootState }, user) {
    commit(USER_UPDATE_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        user,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      commit(USER_UPDATE_SUCCESS);
      console.log(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(USER_UPDATE_FAIL, message);
    }
  },
};

const mutations = {
  [USER_UPDATE_REQUEST]: (state) => {
    state.success = null;
    state.error = null;
    state.loading = true;
  },
  [USER_UPDATE_SUCCESS]: (state) => {
    state.loading = false;
    state.success = true;
  },
  [USER_UPDATE_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [USER_UPDATE_RESET]: (state) => {
    state.success = null;
    state.error = null;
    state.loading = false;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
