<template>
  <div class="mx-auto w-50 p-3 m-3 border border-success rounded">
    <h3>Please fill out the form</h3>
    <div class="mb-3">
      <label for="name" class="form-label">Name:</label>
      <input v-model="name" id="name" type="text" class="form-control" aria-describedby="name-help"/>
      <div id="name-help" class="form-text">Use your full legal name</div>
    </div>
    <div class="mb-3">
      <label for="login-email" class="form-label">Email:</label>
      <input v-model="email" id="login-email" type="email" class="form-control" aria-describedby="email-help"/>
      <div id="email-help" class="form-text">You will have to verify this email later</div>
    </div>
    <div class="mb-3">
      <label for="login-password" class="form-label">Password:</label>
      <input v-model="password" id="login-password" type="password" class="form-control" aria-describedby="password-help"/>
      <div id="password-help" class="form-text">Password must be at least 8 characters long</div>
    </div>
    <div class="mb-3">
      <label for="repeat-password" class="form-label">Repeat Password:</label>
      <input v-model="repeatPassword" id="repeat-password" type="password" class="form-control"/>
    </div>
    <button type="button" class="btn btn-success" @click="signupCallback">Create account</button>
    <router-link class="btn btn-link" to="/action/login">I already have an account</router-link>
  </div>
</template>

<script setup>
import {ref} from "vue";
import UserService from "@/services/UserService";

const name = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");

function signupCallback() {

  if (password.value.length > 7 && password.value === repeatPassword.value) {
    const payload = {
      'email': email.value,
      'password': password.value,
      'name': name.value
    }
    console.log(payload)
    UserService.signup(payload)
  } else {
    alert('Passwords have to match and have to be 8 characters long')
  }
}
</script>

<style scoped>

</style>