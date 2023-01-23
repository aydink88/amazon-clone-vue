<template>
  <div>
    <CheckoutSteps step1 step2 />
    <form class="form" @submit.prevent="submitHandler">
      <div>
        <h1>Shipping Address</h1>
      </div>
      <div>
        <label for="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter full name"
          v-model="fullName"
          required
        />
      </div>
      <div>
        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="Enter address"
          v-model="address"
          required
        />
      </div>
      <div>
        <label for="city">City</label>
        <input
          type="text"
          id="city"
          placeholder="Enter city"
          v-model="city"
          required
        />
      </div>
      <div>
        <label for="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          placeholder="Enter postal code"
          v-model="postalCode"
          required
        />
      </div>
      <div>
        <label for="country">Country</label>
        <input
          type="text"
          id="country"
          placeholder="Enter country"
          v-model="country"
          required
        />
      </div>
      <div>
        <label for="chooseOnMap">Location</label>
        <button type="button" @click="chooseOnMap">Choose On Map</button>
      </div>
      <div>
        <label />
        <button class="primary" type="submit">Continue</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CheckoutSteps from "../components/CheckoutSteps.vue";
import { useCartStore, useUserStore } from "../stores";

const router = useRouter();

const cartStore = useCartStore();
const { shippingAddress } = storeToRefs(cartStore);
const userStore = useUserStore();
const { login, address: addressMap } = storeToRefs(userStore);

if (!login.userInfo) {
  router.push("/signin");
}

const fullName = ref();
const address = ref();
const city = ref();
const postalCode = ref();
const country = ref("");
const lat = ref(null);
const lng = ref(null);

onMounted(() => {
  if (shippingAddress) {
    fullName.value = shippingAddress.fullName;
    address.value = shippingAddress.address;
    city.value = shippingAddress.city;
    postalCode.value = shippingAddress.postalCode;
    country.value = shippingAddress.country;
    lat.value = shippingAddress.lat;
    lng.value = shippingAddress.lng;
  }
});

function chooseOnMap() {
  cartStore.saveShippingAddress({
    fullName: fullName.value,
    address: address.value,
    city: city.value,
    postalCode: postalCode.value,
    country: country.value,
    lat: lat.value,
    lng: lng.value,
  });
  router.push("/map");
}

function submitHandler() {
  const newLat = addressMap ? addressMap.lat : lat.value;
  const newLng = addressMap ? addressMap.lng : lng.value;

  let moveOn = true;
  if (!newLat || !newLng) {
    moveOn = window.confirm("You did not set your location on map. Continue?");
  }
  if (moveOn) {
    cartStore.saveShippingAddress({
      fullName: fullName.value,
      address: address.value,
      city: city.value,
      postalCode: postalCode.value,
      country: country.value,
      lat: newLat,
      lng: newLng,
    });

    this.$router.push("/payment");
  }
}

//   },
//   components: { CheckoutSteps },
//   name: "ShippingScreen",
//   data: () => ({
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     lat: null,
//     lng: null,
//   }),
//   computed: {
//     ...mapState({
//       userInfo: (state) => state.userSignin.userInfo,
//       shippingAddress: (state) => state.cart.shippingAddress,
//       addressMap: (state) => state.userAddressMap.address,
//     }),
//   },
//   methods: {
//     submitHandler() {
//       const newLat = this.addressMap ? this.addressMap.lat : this.lat;
//       const newLng = this.addressMap ? this.addressMap.lng : this.lng;

//       let moveOn = true;
//       if (!newLat || !newLng) {
//         moveOn = window.confirm(
//           "You did not set your location on map. Continue?"
//         );
//       }
//       if (moveOn) {
//         this.$store.dispatch("cart/saveShippingAddress", {
//           fullName: this.fullName,
//           address: this.address,
//           city: this.city,
//           postalCode: this.postalCode,
//           country: this.country,
//           lat: newLat,
//           lng: newLng,
//         });

//         this.$router.push("/payment");
//       }
//     },
//     chooseOnMap() {
//       this.$store.dispatch("cart/saveShippingAddress", {
//         fullName: this.fullName,
//         address: this.address,
//         city: this.city,
//         postalCode: this.postalCode,
//         country: this.country,
//         lat: this.lat,
//         lng: this.lng,
//       });
//       this.$router.push("/map");
//     },
//   },
//   created() {
//     if (!this.userInfo) {
//       this.$router.push("/signin");
//     }
//   },
//   mounted() {
//     if (this.shippingAddress) {
//       this.fullName = this.shippingAddress.fullName;
//       this.address = this.shippingAddress.address;
//       this.city = this.shippingAddress.city;
//       this.postalCode = this.shippingAddress.postalCode;
//       this.country = this.shippingAddress.country;
//       this.lat = this.shippingAddress.lat;
//       this.lng = this.shippingAddress.lng;
//     }
//   },
// };
</script>

<style></style>
