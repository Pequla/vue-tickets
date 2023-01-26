<template>
  <div class="mx-auto w-50 p-3 m-3">
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
</template>

<script setup>
import {ref} from "vue";
import UserService from "@/services/UserService";

const email = ref();
const name = ref();
const created = ref();
const updated = ref();
const last = ref();
const self = ref();

UserService.getSelfUser().then(rsp => {
  self.value = rsp.data
  email.value = rsp.data.email;
  name.value = rsp.data.name;
  created.value = new Date(rsp.data.createdAt).toLocaleString("sr-SR");
  if (rsp.data.updatedAt) {
    updated.value = new Date(rsp.data.updatedAt).toLocaleString("sr-SR");
  } else {
    updated.value = 'Never'
  }
  last.value = new Date(rsp.data.lastLoginAt).toLocaleString("sr-SR");
})

function updateCallback() {
  UserService.updateProfile({name: name.value})
}
</script>

<style scoped>

</style>