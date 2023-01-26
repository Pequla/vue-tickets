<template>
  <div class="mx-auto w-50 p-3 m-3">
    <h3>Welcome back!</h3>
    <div class="mb-3">
      <label for="login-email" class="form-label">Email:</label>
      <input v-model="email" id="login-email" type="email" class="form-control"/>
    </div>
    <div class="mb-3"><label for="login-password" class="form-label">Password:</label>
      <input v-model="password" id="login-password" type="password" class="form-control"/></div>
    <button type="button" class="btn btn-success" @click="loginCallback">Login</button>
    <router-link class="btn btn-link" to="/action/signup">I don't have an account</router-link>
  </div>
</template>

<script setup>
import {ref} from "vue";
import UserService from "@/services/UserService";

const email = ref("");
const password = ref("");

function loginCallback() {
    if ((email.value).length > 3 && (email.value).length > 7 ) {
      UserService.login(email.value, password.value)
    } else {
      alert('Password has to be at least 8 characters long')
    }
}

</script>

<style scoped>

</style>