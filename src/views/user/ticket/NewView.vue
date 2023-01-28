<template>
  <div class="mx-auto w-50 p-3 m-3">
    <h3>New ticket order</h3>
    <div class="mb-3">
      <label for="flight" class="form-label">Flight:</label>
      <input v-model="flight" id="flight" type="text" class="form-control" disabled/>
    </div>
    <div class="mb-3">
      <label for="destination" class="form-label">Destination:</label>
      <input v-model="destination" id="destination" type="text" class="form-control"/>
    </div>
    <div class="mb-3">
      <label for="departure" class="form-label">Departure:</label>
      <input v-model="departure" id="departure" type="text" class="form-control" disabled/>
    </div>
    <div class="mb-3">
      <label for="airline" class="form-label">Chose your Airline:</label>
      <select class="form-select" id="airline" v-model="airline">
        <option value="Air Serbia">Air Serbia</option>
        <option value="Fly Emirates">Fly Emirates</option>
        <option value="Air France">Air France</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="count" class="form-label">Chose ticket count:</label>
      <select class="form-select" id="count" v-model="count">
        <option value="1">Single person</option>
        <option value="2">Two people</option>
        <option value="3">Tree people</option>
      </select>
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="one-way" v-model="oneWay">
      <label class="form-check-label" for="one-way">One way ticket</label>
    </div>
    <button type="button" class="btn btn-success" @click="bookCallback">Book now</button>
  </div>
</template>

<script setup>
// FLIGHT, DEPARTURE, AIRLINE, COUNT
import {ref} from "vue";
import UserService from "@/services/UserService";
import {useRoute} from "vue-router";
import FlightService from "@/services/FlightService";

const route = useRoute()
const id = route.params.id;

const flight = ref();
const destination = ref();
const departure = ref();

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

FlightService.getFlightById(id).then(rsp => {
  flight.value = rsp.data.flightKey;
  destination.value = rsp.data.destination;
  departure.value = new Date(rsp.data.scheduledAt).toLocaleString("sr-SR");
})

function bookCallback() {
  UserService.createTicket({
    'flightId': id,
    'airline': airline.value,
    'count': count.value,
    'oneWay': oneWay.value
  })
}
</script>

<style scoped>

</style>