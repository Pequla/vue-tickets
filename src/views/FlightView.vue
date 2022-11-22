<template>
    <div class="flights">
        <h1>Flights</h1>
        <div v-if="flights">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">FLIGHT</th>
                        <th scope="col">AIRLINE</th>
                        <th scope="col">GATE</th>
                        <th scope="col">DESTINATION</th>
                        <th scope="col">DEPARTURE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="flight in flights.data">
                        <th scope="row">{{ flight.flight.number }}</th>
                        <td>{{ flight.airline.name }}</td>
                        <td>{{ flight.departure.gate }}</td>
                        <td>{{ flight.arrival.airport }}</td>
                        <td>{{ new Date(flight.departure.scheduled) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mx-auto text-center" v-else>
            <p>Please wait, loading flight data</p>
            <img src="@/assets/img/halflife_cat.gif" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const flights = ref(null)

axios.get('http://localhost:3200/api/flights')
    .then(rsp => {
        console.log(rsp)
        flights.value = rsp.data
    }).catch(e => console.log(e.message));
</script>