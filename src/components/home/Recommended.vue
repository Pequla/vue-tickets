<template>
  <div class="row mb-3" v-if="(results && results.length > 0)">
    <div class="col-sm d-flex justify-content-center" v-for="result in results.slice(0, 3)">
      <div class="card">
        <img :src="ImageService.getDestinationImageUrl(result.destination)" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ result.destination }}</h5>
          <p class="card-text">Flight <strong>{{ result.flightNumber }}</strong>, departure at: <strong>{{
              new Date(result.scheduledAt).toLocaleString('sr-SR')
            }}</strong></p>
        </div>
        <div class="card-body">
          <router-link :to="'/user/ticket/new/'+result.id" class="card-link btn btn-success">Book</router-link>
          <router-link :to="'/flight/'+result.id" class="card-link btn btn-secondary">More Details</router-link>
        </div>
      </div>
    </div>
  </div>
  <MapDisplay :data="mapData" v-if="mapData"></MapDisplay>
</template>

<script setup>
import MapDisplay from "@/components/MapDisplay.vue";
import {ref} from "vue";
import FlightService from "@/services/FlightService";
import ImageService from "@/services/ImageService";
import HereService from "@/services/HereService";

const results = ref();
const mapData = ref();
FlightService.getFlights().then(rsp => {
  results.value = rsp.data.content

  const localMarkers = [];
  rsp.data.content.forEach(flight => {
    HereService.geocode(flight.destination)
        .then(coded => {
          localMarkers.push({
            id: flight.id,
            position: coded.data.items[0].position
          })
        })
  });

  mapData.value = {
    center: {lat: 44.787197, lng: 20.457273},
    zoom: 4,
    markers: localMarkers
  }
})
</script>

<style scoped>

</style>