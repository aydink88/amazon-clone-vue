import axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants";

const state = () => ({
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
});

const getters = {};

const actions = {
  async signin({ commit }, { email, password }) {
    commit(USER_SIGNIN_REQUEST);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",
        {
          email,
          password,
        }
      );
      commit(USER_SIGNIN_SUCCESS, data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      commit(
        USER_SIGNIN_FAIL,
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  signout({ commit }) {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    commit(USER_SIGNOUT);
    document.location.href = "/signin";
  },
};

const mutations = {
  [USER_SIGNIN_REQUEST]: (state) => {
    state.error = null;
    state.userInfo = null;
    state.loading = true;
  },
  [USER_SIGNIN_SUCCESS]: (state, userInfo) => {
    state.loading = false;
    state.userInfo = userInfo;
  },
  [USER_SIGNIN_FAIL]: (state, error) => {
    state.loading = false;
    state.error = error;
  },
  [USER_SIGNOUT]: () => {
    state.userInfo = null;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
