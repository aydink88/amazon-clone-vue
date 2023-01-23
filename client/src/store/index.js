import { createStore } from "vuex";
import cart from "./cart/";
import {
  userAddressMap,
  userDelete,
  userDetails,
  userList,
  userRegister,
  userSignin,
  userTopSellersList,
  userUpdate,
  userUpdateProfile,
} from "./user";
import {
  productCategoryList,
  productCreate,
  productDelete,
  productDetails,
  productList,
  productReviewCreate,
  productUpdate,
} from "./product";
import order from "./order";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    userAddressMap,
    userDelete,
    userDetails,
    userList,
    userRegister,
    userSignin,
    userTopSellersList,
    userUpdate,
    userUpdateProfile,
    productCategoryList,
    productCreate,
    productDelete,
    productDetails,
    productList,
    productReviewCreate,
    productUpdate,
    order,
  },
});
