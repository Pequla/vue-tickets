<template>
  <div class="home">
    <h1>Home</h1>
    <GoogleMap :api-key="mapsApiKey" style="width: 100%; height: 500px" :center="center" :zoom="15">
      <Marker :options="{ position: marker }" />
    </GoogleMap>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
const mapsApiKey = 'AIzaSyBqXg92FLPp8VgrZs65RtjZgsY5WK9TiJA';
const center = { lat: 44.689247, lng: 20.044502 };
const marker = { lat: 44.689247, lng: 20.044502 };
</script>

<style>
#map {
  width: 100%;
}
</style>