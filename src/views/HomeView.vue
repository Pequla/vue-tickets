<template>
  <div class="home">
    <h1>Home</h1>
    <div class="row mb-3">
      <div class="col-sm">
        Destination:
        <select class="form-select" v-model="destination" @change="refreshData">
          <option value="invalid">Select destination</option>
          <option v-for="destination in destinations" :value="destination">{{ destination }}</option>
        </select>
      </div>
      <div class="col-sm">
        Ticket count:
        <select class="form-select">
          <option selected>Select count</option>
          <option value="1">1 (One)</option>
          <option value="2">2 (Two)</option>
          <option value="2">3 (Tree)</option>
          <option value="2">4 (Four)</option>
          <option value="2">5 (Five)</option>
        </select>
      </div>
      <div class="col-sm">
        Passanger type:
        <select class="form-select">
          <option selected>Select type</option>
          <option value="1">Adults</option>
          <option value="2">Kids</option>
        </select>
      </div>
      <div class="col-sm">
        Date:
        <select class="form-select">
          <option selected>Select date</option>
          <option value="1">Today</option>
          <option value="2">Tomorrow</option>
        </select>
      </div>
    </div>
    <div class="row mb-3" v-if="(results && results.length > 0)">
      <div class="col-sm" v-for="result in results.slice(0, 3)">
        <div class="card">
          <img :src="getDestImageUrl(result.destination)" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ result.destination }}</h5>
            <p class="card-text">Flight <strong>{{ result.flightNumber }}</strong>, departure at: <strong>{{ new
                Date(result.scheduledAt).toLocaleString('sr-SR')
            }}</strong></p>
          </div>
          <div class="card-body">
            <a href="#" class="card-link btn btn-primary">Book</a>
            <a href="#" class="card-link btn btn-secondary">More Details</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3" v-else>
      No flights found to <strong>{{destination}}</strong>
    </div>
    <div class="row mb-3">
      <div class="col">
        <GoogleMap :api-key="mapsApiKey" style="width: 100%; height: 480px" :center="center" :zoom="4"
          map-type-id="terrain">
          <Marker v-for="marker in positions" :options="{ position: marker }" />
        </GoogleMap>
      </div>
    </div>
  </div>
</template>

<script setup>
import FlightService from "@/services/FlightService";
import HereService from "@/services/HereService";
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

const mapsApiKey = 'AIzaSyDK8SrIRcGIsEH6toNfU1C85qnaLiECvKs';
const center = { lat: 44.787197, lng: 20.457273 };

const destinations = ref(null);
const destination = ref("invalid")
FlightService.getDestinations()
  .then(rsp => {
    destinations.value = rsp.data
    // destination.value = rsp.data[0]
    // refreshData();
  })



const results = ref(null);
const positions = ref([]);
const renderData = function (service) {
  service.then(rsp => {
    results.value = rsp.data.content
    rsp.data.content.forEach(flight => {
      console.log()
      HereService.geocode(flight.destination.replace(' ', '+'))
        .then(coded => {
          console.log(coded.data.items[0].position)
          positions.value.push(coded.data.items[0].position)
        })
    });
  })
}

// Render the base data
renderData(FlightService.getFlights())

const refreshData = function () {
  if (!destination) return

  if (destination.value === "invalid") {
    renderData(FlightService.getFlights())
  }
  else {
    renderData(FlightService.getFlightsByDestination(destination.value))
  }
}

const getDestImageUrl = function (dest) {
  try {
    return require('@/assets/img/destination/' + dest.toLowerCase().split(' ')[0] + '.jpg');
  } catch (error) {
    return require('@/assets/img/destination/default.jpg')
  }
}
</script>

<style>
#map {
  width: 100%;
}
</style>