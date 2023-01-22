<template>
  <div v-if="flight">
    <Breadcrumb :crumbs="crumbs" v-if="crumbs"></Breadcrumb>
    <h1>{{ flight.flightNumber }} ({{ flight.destination }})</h1>
    <div class="row mb-3">
      <div class="col-8">
        <table class="table table-striped">
          <tbody>
          <tr>
            <th>ID</th>
            <th>{{ flight.id }}</th>
          </tr>
          <tr>
            <th>NUMBER</th>
            <th>{{ flight.flightNumber }}</th>
          </tr>
          <tr>
            <th>DESTINATION</th>
            <th>{{ flight.destination }}</th>
          </tr>
          <tr>
            <th>SCHEDULED AT</th>
            <th>{{ new Date(flight.scheduledAt).toLocaleString('sr-SR') }}</th>
          </tr>
          <tr>
            <th>ESTIMATED AT</th>
            <th v-if="flight.estimatedAt">{{ new Date(flight.estimatedAt).toLocaleString('sr-SR') }}</th>
            <th v-else>N/A</th>
          </tr>
          <tr>
            <th>AIRPLANE MODEL</th>
            <th>{{ flight.plane }}</th>
          </tr>
          <tr>
            <th>GATE</th>
            <th v-if="flight.gate">{{ flight.gate }}</th>
            <th v-else>N/A</th>
          </tr>
          <tr>
            <th>TERMINAL</th>
            <th>{{ flight.terminal }}</th>
          </tr>
          <tr>
            <th colspan="2">
              <button class="btn btn-primary m-1">Book Now</button>
              <button class="btn btn-success">Save To Favourites</button>
            </th>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-4" id="dest-image"></div>
    </div>
    <MapDisplay :center="mapCenter" v-if="mapCenter" :markers="[mapCenter]"></MapDisplay>
  </div>
  <div v-else>
    Loading data, please wait...
  </div>
</template>

<script setup>
import FlightService from '@/services/FlightService';
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import Breadcrumb from "@/components/Breadcrumb.vue";
import ImageService from "@/services/ImageService";
import HereService from "@/services/HereService";
import MapDisplay from "@/components/MapDisplay.vue";

const route = useRoute()
const id = route.params.id;

const flight = ref(null);
const crumbs = ref([]);
const mapCenter = ref(null);
FlightService.getFlightById(id)
    .then(rsp => {
      flight.value = rsp.data
      crumbs.value = [
        {url: '/flight', text: 'Flights'},
        {text: rsp.data.flightKey}
      ]

      // Load location image
      let img = new Image();
      img.onload = function () {
        const dive = document.getElementById("dest-image")
        dive.style.backgroundImage = "url('" + img.src + "')";
        dive.style.backgroundSize = "cover";
        dive.style.backgroundPosition = "center"
      };
      img.src = ImageService.getDestinationImageUrl(rsp.data.destination);

      // Load map
      HereService.geocode(rsp.data.destination)
          .then(coded => {
            mapCenter.value = coded.data.items[0].position
          });
    })
</script>