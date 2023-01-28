<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th scope="col">FLIGHT</th>
      <th scope="col">DESTINATION</th>
      <th scope="col">GATE</th>
      <th scope="col">AIRPLANE MODEL</th>
      <th scope="col">DEPARTURE SCHEDULED</th>
      <th scope="col">DEPARTURE ESTIMATED</th>
      <th scope="col">ACTIONS</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="flight in flights">
      <th scope="row">{{ flight.flightNumber }}</th>
      <td>{{ flight.destination }}</td>
      <td>{{ flight.gate }}</td>
      <td>{{ flight.plane }}</td>
      <td>{{ new Date(flight.scheduledAt).toLocaleString('sr-SR') }}</td>
      <td v-if="flight.estimatedAt">{{ new Date(flight.estimatedAt).toLocaleString('sr-SR') }}</td>
      <td v-else>N/A</td>
      <td>
        <router-link :to="('/user/ticket/new/' + flight.id)" class="btn btn-success m-1">Book</router-link>
        <router-link :to="('/flight/' + flight.id)" class="btn btn-secondary m-1">More Details</router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import {toRefs} from "vue";

const props = defineProps({
  flights: Array
});
const {flights} = toRefs(props);
</script>