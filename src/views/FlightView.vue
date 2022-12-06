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
                        <th scope="col">DEPARTURE</th>
                        <th scope="col">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="flight in flights">
                        <th scope="row">{{ flight.BROJ_LETA }}</th>
                        <td>{{ flight.DESTINACIJA }}</td>
                        <td>{{ flight.GATE_BAY }}</td>
                        <td>{{ flight.TIP_AVIONA }}</td>
                        <td>{{ flight.ST + ' ' + flight.DATUM + ' ET: ' + flight.ET + ' ' + flight.DATUM_E }}</td>
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
            <img src="@/assets/img/halflife_cat.gif" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const flights = ref(null)

axios.get('http://localhost:7000/api/flights/today')
    .then(rsp => {
        console.log(rsp)
        flights.value = rsp.data
    }).catch(e => console.log(e.message));
</script>