import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants";

const state = () => ({
  orderCreate: {},
  orderDetails: {},
  orderPay: {},
  orderMineList: {},
  orderList: {},
  orderDelete: {},
  orderDeliver: {},
});

const getters = {};

const actions = {
  async createOrder({ commit, rootState }, order) {
    commit(ORDER_CREATE_REQUEST);
    try {
      const {
        userSignin: { userInfo },
      } = rootState;
      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit(ORDER_CREATE_SUCCESS, data.order);
      commit("cart/CART_EMPTY", null, { root: true });
      localStorage.removeItem("cartItems");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(ORDER_CREATE_FAIL, message);
    }
  },
  async getOrderDetails({ commit, rootState }, orderId) {
    commit(ORDER_DETAILS_REQUEST);
    try {
      const {
        userSignin: { userInfo },
      } = rootState;
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/" + orderId,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit(ORDER_DETAILS_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(ORDER_DETAILS_FAIL, message);
    }
  },
  async payOrder({ commit, rootState }, { order, paymentResult }) {
    commit(ORDER_PAY_REQUEST);
    try {
      const {
        userSignin: { userInfo },
      } = rootState;
      const { data } = await axios.put(
        "http://localhost:5000/api/orders/" + order._id + "/pay",
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit(ORDER_PAY_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(ORDER_PAY_FAIL, message);
    }
  },
  async listOrderMine({ commit, rootState }) {
    commit(ORDER_MINE_LIST_REQUEST);
    try {
      const {
        userSignin: { userInfo },
      } = rootState;
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/mine",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit(ORDER_MINE_LIST_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(ORDER_MINE_LIST_FAIL, message);
    }
  },
  async listOrders({ commit, rootState }, { seller = "" }) {
    commit(ORDER_LIST_REQUEST);
    try {
      const {
        userSignin: { userInfo },
      } = rootState;
      const { data } = await axios.get(
        "http://localhost:5000/api/orders?seller=" + seller,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit(ORDER_LIST_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(ORDER_LIST_FAIL, message);
    }
  },
  async deleteOrder({ commit, rootState }, orderId) {
    commit(ORDER_DELETE_REQUEST);
    try {
      const {
        userSignin: { userInfo },
      } = rootState;
      const { data } = await axios.delete(
        "http://localhost:5000/api/orders/" + orderId,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit(ORDER_DELETE_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(ORDER_DELETE_FAIL, message);
    }
  },
  async deliverOrder({ commit, rootState }, orderId) {
    commit(ORDER_DELIVER_REQUEST);
    try {
      const {
        userSignin: { userInfo },
      } = rootState;
      const { data } = await axios.put(
        "http://localhost:5000/api/orders/" + orderId + "/deliver",
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit(ORDER_DELIVER_SUCCESS, data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      commit(ORDER_DELIVER_FAIL, message);
    }
  },
};

const mutations = {
  [ORDER_CREATE_REQUEST]: (state) => {
    state.orderCreate = { loading: true };
  },
  [ORDER_CREATE_SUCCESS]: (state, order) => {
    state.orderCreate = { loading: false, success: true, order };
  },
  [ORDER_CREATE_FAIL]: (state, error) => {
    state.orderCreate = { loading: false, error };
  },
  [ORDER_CREATE_RESET]: (state) => {
    state.orderCreate = {};
  },
  [ORDER_DETAILS_REQUEST]: (state) => {
    state.orderDetails = { loading: true };
  },
  [ORDER_DETAILS_SUCCESS]: (state, order) => {
    state.orderDetails = { loading: false, success: true, order };
  },
  [ORDER_DETAILS_FAIL]: (state, error) => {
    state.orderDetails == { loading: false, error };
  },
  [ORDER_PAY_REQUEST]: (state) => {
    state.orderPay = { loading: true };
  },
  [ORDER_PAY_SUCCESS]: (state) => {
    state.orderPay = { loading: false, success: true };
  },
  [ORDER_PAY_FAIL]: (state, error) => {
    state.orderPay = { loading: false, error };
  },
  [ORDER_PAY_RESET]: (state) => {
    state.orderPay = {};
  },
  [ORDER_MINE_LIST_REQUEST]: (state) => {
    state.orderMineList = { loading: true };
  },
  [ORDER_MINE_LIST_SUCCESS]: (state, orders) => {
    state.orderMineList = { loading: false, orders };
  },
  [ORDER_MINE_LIST_FAIL]: (state, error) => {
    state.orderMineList == { loading: false, error };
  },
  [ORDER_LIST_REQUEST]: (state) => {
    state.orderList = { loading: true };
  },
  [ORDER_LIST_SUCCESS]: (state, orders) => {
    state.orderList = { loading: false, orders };
  },
  [ORDER_LIST_FAIL]: (state, error) => {
    state.orderList == { loading: false, error };
  },
  [ORDER_DELETE_REQUEST]: (state) => {
    state.orderDelete = { loading: true };
  },
  [ORDER_DELETE_SUCCESS]: (state) => {
    state.orderDelete = { loading: false, success: true };
  },
  [ORDER_DELETE_FAIL]: (state, error) => {
    state.orderDelete = { loading: false, error };
  },
  [ORDER_DELETE_RESET]: (state) => {
    state.orderDelete = {};
  },
  [ORDER_DELIVER_REQUEST]: (state) => {
    state.orderDeliver = { loading: true };
  },
  [ORDER_DELIVER_SUCCESS]: (state) => {
    state.orderDeliver = { loading: false, success: true };
  },
  [ORDER_DELIVER_FAIL]: (state, error) => {
    state.orderDeliver = { loading: false, error };
  },
  [ORDER_DELIVER_RESET]: (state) => {
    state.orderDeliver = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
