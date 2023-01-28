<template>
  <Breadcrumb :crumbs="[{text: 'Profile', url: '/user/profile'},{text: 'Change Password'}]" />
  <div class="mx-auto w-50 p-3 m-3">
    <h3>Change password form</h3>
    <div class="mb-3">
      <label for="old" class="form-label">Current Password:</label>
      <input v-model="old" id="old" type="password" class="form-control"/>
    </div>
    <div class="mb-3">
      <label for="new" class="form-label">New Password:</label>
      <input v-model="np" id="new" type="password" class="form-control"/>
    </div>
    <div class="mb-3">
      <label for="repeat" class="form-label">Repeat New Password:</label>
      <input v-model="rp" id="repeat" type="password" class="form-control"/>
    </div>
    <button type="button" class="btn btn-success" @click="updateCallback">Change password</button>
    <router-link class="btn btn-link" to="/user/profile">Go back to profile</router-link>
  </div>
</template>

<script setup>
import {ref} from "vue";
import UserService from "@/services/UserService";
import Breadcrumb from "@/components/Breadcrumb.vue";

const old = ref();
const np = ref();
const rp = ref();

function updateCallback() {
  if (np.value && rp.value && np.value.length > 7 && rp.value === np.value) {
    // update password
    UserService.changePassword({
      newPassword: np.value,
      oldPassword: old.value
    });
    return
  }
  alert("Passwords need to match and must be at least 8 chars long")
}
</script>

<style scoped>

</style>