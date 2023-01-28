<template>
  <div class="home" v-if="destinations">
    <div class="row mb-3">
      <div class="col-sm">
        Destination:
        <select class="form-select" v-model="destination" @change="refreshData">
          <option value="Recommended">Recommended</option>
          <option v-for="destination in destinations" :value="destination">{{ destination }}</option>
        </select>
      </div>
      <div class="col-sm">
        Airline:
        <select class="form-select" id="airline" v-model="airline" @change="updateChoice">
          <option value="Air Serbia">Air Serbia</option>
          <option value="Fly Emirates">Fly Emirates</option>
          <option value="Air France">Air France</option>
        </select>
      </div>
      <div class="col-sm">
        Ticket count:
        <select class="form-select" id="count" v-model="count" @change="updateChoice">
          <option value="1">Single person</option>
          <option value="2">Two people</option>
          <option value="3">Tree people</option>
        </select>
      </div>
      <div class="col-sm">
        Ticket type:
        <select class="form-select" id="count" v-model="oneWay" @change="updateChoice">
          <option value="true">One way</option>
          <option value="false">Return</option>
        </select>
      </div>
    </div>

    <Recommended v-if="destination === 'Recommended'"></Recommended>
    <FlightTable v-else :flights="results"></FlightTable>
  </div>
  <LoadingWidget v-else></LoadingWidget>
</template>

<script setup>
import FlightService from "@/services/FlightService";
import {ref} from "vue";
import LoadingWidget from "@/components/LoadingWidget.vue";
import FlightTable from "@/components/flight/FlightTable.vue";
import Recommended from "@/components/home/Recommended.vue";

if (!localStorage.getItem('destination')) {
  localStorage.setItem('destination', 'Recommended')
}
const destination = ref(localStorage.getItem('destination'))

const destinations = ref(null);
FlightService.getDestinations()
    .then(rsp => {
      destinations.value = rsp.data
    })

// Setting airline
if (!localStorage.getItem('airline')) {
  localStorage.setItem('airline', 'Air Serbia')
}
const airline = ref(localStorage.getItem('airline'))

// Setting count
if (!localStorage.getItem('count')) {
  localStorage.setItem('count', '1')
}
const count = ref(parseInt(localStorage.getItem('count')))

// Setting one way
if (!localStorage.getItem('oneWay')) {
  localStorage.setItem('oneWay', 'true')
}
const oneWay = ref(localStorage.getItem('oneWay'))

const results = ref([]);

function refreshData() {
  localStorage.setItem('destination', destination.value)
  if (destination.value === 'Recommended') return;
  FlightService.getFlightsByDestination(destination.value)
      .then(rsp => {
        results.value = rsp.data.content;
      })
}

// In case the destination is set
refreshData();

function updateChoice() {
  localStorage.setItem('airline', airline.value)
  localStorage.setItem('count', count.value.toString())
  localStorage.setItem('oneWay', oneWay.value.toString())
}
</script>