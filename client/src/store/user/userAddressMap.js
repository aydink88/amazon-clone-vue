import { USER_ADDRESS_MAP_CONFIRM } from "../constants";

const state = () => ({});

const getters = {};

const actions = {
  updateAddressMap({ commit }, address) {
    commit(USER_ADDRESS_MAP_CONFIRM, address);
  },
};

const mutations = {
  [USER_ADDRESS_MAP_CONFIRM]: (state, address) => {
    state.address = address;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
