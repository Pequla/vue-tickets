<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
        VueTickets
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/flight">Flights</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <input class="form-control me-2" type="search" placeholder="I want to go to..." v-model="destination">
          <button class="btn btn-outline-success" type="button" @click="search">Search</button>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view/>
    <footer class="text-center">
      <p>&copy; {{ year }} <a href="https://github.com/Pequla">Petar Kresoja 2019200948</a> | Powered by <a
          href="https://getbootstrap.com/">Boostrap 5</a> & <a href="https://vuejs.org/">Vue 3</a></p>
    </footer>
  </div>
</template>

<script setup>
import {ref} from "vue";

const year = new Date().getFullYear();
const destination = ref();
const search = function () {
  console.log('Looking up: ' + destination.value)
}
</script>
