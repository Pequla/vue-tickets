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
          <li class="nav-item dropdown" v-if="isLoggedIn && user">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
               aria-expanded="false">
              {{ user }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/user/profile">Profile</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/user/ticket">My Tickets</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/user/ticket/used">Used Tickets</router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <router-link class="dropdown-item" to="/action/logout">Logout</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" aria-current="page" to="/action/login">Login</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <input class="form-control me-2" type="search" list="destinationOptions" placeholder="I want to go to..."
                 v-model="destination"
                 @keypress="keyPressHandler" @input="queryOptions">
          <datalist id="destinationOptions">
            <option v-for="option in options" :value="option"/>
          </datalist>
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
import router from "@/router";
import UserService from "@/services/UserService";
import FlightService from "@/services/FlightService";

const year = new Date().getFullYear();
const destination = ref();
const search = function () {
  if (destination.value == "" || destination.value == null || destination.value == " ") return;
  router.push('/search/' + destination.value);
  destination.value = null;
}
const keyPressHandler = (e) => {
  if (e.key === 'Enter') {
    search();
  }
}

const options = ref();

function queryOptions() {
  FlightService.searchDestinations(destination.value).then(rsp => options.value = rsp.data)
}

const isLoggedIn = localStorage.getItem('token') !== null
const user = ref();
UserService.getSelfUser().then(rsp => user.value = rsp.data.name);
</script>
