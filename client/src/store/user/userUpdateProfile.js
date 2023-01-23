import axios from "axios";
import {
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants";

const state = () => ({});

const getters = {};

const actions = {
  async updateUserProfile({ commit, rootState }, user) {
    commit(USER_UPDATE_PROFILE_REQUEST);
    const userInfo = rootState.userSignin.userInfo;
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        user,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      commit(USER_UPDATE_PROFILE_SUCCESS);
      commit("userSignin/USER_SIGNIN_SUCCESS", data, { root: true });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(USER_UPDATE_PROFILE_FAIL, message);
    }
  },
};

const mutations = {
  [USER_UPDATE_PROFILE_REQUEST]: (state) => {
    state.success = null;
    state.error = null;
    state.loading = true;
  },
  [USER_UPDATE_PROFILE_SUCCESS]: (state) => {
    state.loading = false;
    state.success = true;
  },
  [USER_UPDATE_PROFILE_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [USER_UPDATE_PROFILE_RESET]: (state) => {
    state.success = null;
    state.error = null;
    state.loading = false;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
