import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants";

const state = () => ({
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentMethod: "PayPal",
});

const getters = {};

const actions = {
  async addToCart(context, [productId, qty]) {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
    console.log(data);
    const cartItems = context.state.cartItems;
    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
      context.commit(
        CART_ADD_ITEM_FAIL,
        `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`
      );
    } else {
      context.commit(CART_ADD_ITEM, {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(context.state.cartItems)
      );
    }
  },
  removeFromCart({ commit, state }, productId) {
    commit(CART_REMOVE_ITEM, productId);
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
  saveShippingAddress({ commit }, data) {
    commit(CART_SAVE_SHIPPING_ADDRESS, data);
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  },
  savePaymentMethod({ commit }, data) {
    commit(CART_SAVE_PAYMENT_METHOD, data);
  },
};

const mutations = {
  [CART_ADD_ITEM]: (state, item) => {
    const existItem = state.cartItems.find((x) => x.product === item.product);
    if (existItem) {
      state.cartItems = state.cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    } else {
      state.cartItems = [...state.cartItems, item];
      state.error = "";
    }
  },
  [CART_REMOVE_ITEM]: (state, item) => {
    state.error = "";
    state.cartItems = state.cartItems.filter((x) => x.product !== item);
  },
  [CART_SAVE_SHIPPING_ADDRESS]: (state, address) => {
    state.shippingAddress = address;
  },
  [CART_SAVE_PAYMENT_METHOD]: (state, method) => {
    state.paymentMethod = method;
  },
  CART_SET_PRICES: (state, prices) => {
    state.prices = prices;
  },
  [CART_ADD_ITEM_FAIL]: (state, error) => {
    state.error = error;
  },
  [CART_EMPTY]: (state) => {
    state.error = "";
    state.cartItems = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
