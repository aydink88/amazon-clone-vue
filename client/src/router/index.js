import { createRouter, createWebHistory } from "vue-router";
import {
  CartScreen,
  HomeScreen,
  MapScreen,
  OrderHistoryScreen,
  OrderListScreen,
  OrderScreen,
  PaymentMethodScreen,
  PlaceOrderScreen,
  ProductEditScreen,
  ProductListScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  SearchScreen,
  SellerScreen,
  ShippingAddressScreen,
  SigninScreen,
  UserEditScreen,
  UserListScreen,
} from "../views";
import { adminGuard, sellerGuard, userGuard } from "./guard";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeScreen,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: HomeScreen,
  },
  {
    path: "/seller/:id",
    name: "SellerScreen",
    component: SellerScreen,
  },
  {
    path: "/cart/:id",
    name: "CartScreenbyId",
    component: CartScreen,
    props: true,
  },
  {
    path: "/cart",
    name: "CartScreen",
    component: CartScreen,
  },
  {
    path: "/product/:id",
    name: "ProductScreen",
    component: ProductScreen,
    props: true,
  },
  {
    path: "/product/:id/edit",
    name: "ProductEditScreen",
    component: ProductEditScreen,
    props: true,
  },
  {
    path: "/signin",
    name: "SigninScreen",
    component: SigninScreen,
  },
  {
    path: "/register",
    name: "RegisterScreen",
    component: RegisterScreen,
  },
  {
    path: "/shipping",
    name: "ShippingAddressScreen",
    component: ShippingAddressScreen,
  },
  {
    path: "/payment",
    name: "PaymentMethodScreen",
    component: PaymentMethodScreen,
  },
  {
    path: "/placeorder",
    name: "PlaceOrderScreen",
    component: PlaceOrderScreen,
  },
  {
    path: "/order/:id",
    name: "OrderScreen",
    component: OrderScreen,
    props: true,
  },
  {
    path: "/orderhistory",
    name: "OrderHistoryScreen",
    component: OrderHistoryScreen,
  },
  {
    path: "/search/name/:name?",
    name: "SearchScreen",
    component: SearchScreen,
  },
  {
    path: "/search/category/:category",
    name: "SearchCategory",
    component: SearchScreen,
  },
  {
    path: "/category/:category/name/:name",
    name: "SearchNamebyCategory",
    component: SearchScreen,
  },
  {
    path: "/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber",
    name: "SearchDetailed",
    component: SearchScreen,
    props: true,
  },
  {
    path: "/profile",
    name: "ProfileScreen",
    component: ProfileScreen,
    beforeEnter: userGuard,
  },
  {
    path: "/map",
    name: "MapScreen",
    component: MapScreen,
    beforeEnter: userGuard,
  },
  {
    path: "/productlist",
    name: "ProductListScreen",
    component: ProductListScreen,
    beforeEnter: adminGuard,
  },
  {
    path: "/productlist/pageNumber/:pageNumber",
    name: "ProductListbyPage",
    component: ProductListScreen,
    beforeEnter: adminGuard,
    props: true,
  },
  {
    path: "/orderlist",
    name: "OrderListScreen",
    component: OrderListScreen,
    beforeEnter: adminGuard,
  },
  {
    path: "/userlist",
    name: "UserListScreen",
    component: UserListScreen,
    beforeEnter: adminGuard,
  },
  {
    path: "/user/:id/edit",
    name: "UserEditScreen",
    component: UserEditScreen,
    beforeEnter: adminGuard,
    props: true,
  },
  {
    path: "/productlist/seller",
    name: "ProductListScreenbySeller",
    component: ProductListScreen,
    beforeEnter: sellerGuard,
  },
  {
    path: "/orderlist/seller",
    name: "OrderListScreenSeller",
    component: OrderListScreen,
    beforeEnter: sellerGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
