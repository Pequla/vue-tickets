<template>
  <div v-if="self">
    <Breadcrumb :crumbs="[{text: 'Profile'}]"></Breadcrumb>
    <div class="mx-auto w-50 pb-3 mb-3">
      <h3>Profile information</h3>
      <div class="mb-3">
        <label for="login-email" class="form-label">Email:</label>
        <input v-model="email" id="login-email" type="email" class="form-control" disabled/>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input v-model="name" id="name" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label for="country" class="form-label">Country:</label>
        <select class="form-select" id="country" v-model="country">
          <option value="Serbia">Serbia</option>
          <option value="Montenegro">Montenegro</option>
          <option value="North Macedonia">North Macedonia</option>
          <option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="city" class="form-label">City:</label>
        <input v-model="city" id="city" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address:</label>
        <input v-model="address" id="address" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone:</label>
        <input v-model="phone" id="phone" type="tel" class="form-control"/>
      </div>
      <div class="mb-3">
        <label for="created" class="form-label">Created At:</label>
        <input v-model="created" id="created" type="text" class="form-control" disabled/>
      </div>
      <div class="mb-3">
        <label for="updated" class="form-label">Updated At:</label>
        <input v-model="updated" id="updated" type="text" class="form-control" disabled/>
      </div>
      <div class="mb-3">
        <label for="last" class="form-label">Last login:</label>
        <input v-model="last" id="last" type="text" class="form-control" disabled/>
      </div>
      <button type="button" class="btn btn-success" @click="updateCallback">Update profile</button>
    </div>
  </div>
  <LoadingWidget v-else></LoadingWidget>
</template>

<script setup>
import {ref} from "vue";
import UserService from "@/services/UserService";
import Breadcrumb from "@/components/Breadcrumb.vue";
import LoadingWidget from "@/components/LoadingWidget.vue";

const email = ref();
const name = ref();
const country = ref();
const city = ref();
const address = ref();
const phone = ref();
const created = ref();
const updated = ref();
const last = ref();
const self = ref();

UserService.getSelfUser().then(rsp => {
  self.value = rsp.data
  email.value = rsp.data.email;
  name.value = rsp.data.name;
  country.value = rsp.data.country;
  city.value = rsp.data.city;
  address.value = rsp.data.address;
  phone.value = rsp.data.phone;
  created.value = new Date(rsp.data.createdAt).toLocaleString("sr-SR");
  if (rsp.data.updatedAt) {
    updated.value = new Date(rsp.data.updatedAt).toLocaleString("sr-SR");
  } else {
    updated.value = 'Never'
  }
  last.value = new Date(rsp.data.lastLoginAt).toLocaleString("sr-SR");
})

function updateCallback() {
  UserService.updateProfile({
    name: name.value,
    country: country.value,
    city: city.value,
    address: address.value,
  })
}
</script>

<style scoped>

</style>