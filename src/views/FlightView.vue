<template>
    <div class="flights">
        <h1>Flights</h1>
        <div v-if="flights">
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
                            <router-link to="/" class="btn btn-primary m-1">Book</router-link>
                            <router-link to="/" class="btn btn-secondary m-1">More Details</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mx-auto text-center" v-else>
            <p>Please wait, loading flight data</p>
            <img src="@/assets/img/halflife_cat.gif" class="w-200px" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import FlightService from '@/services/FlightService'

const flights = ref(null)

FlightService.getFlights()
    .then(rsp => {
        console.log(rsp)
        flights.value = rsp.data.content
    }).catch(e => console.log(e.message));
</script>

<style scoped>
.w-200px {
    width: 200px;
}
</style>