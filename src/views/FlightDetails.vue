<template>
    <div class="flight">
        <h1>Flight {{flight.flightNumber}}</h1>
        <ul>
            <li>ID: {{flight.id}} </li>
            <li>Destination: {{flight.destination}}</li>
        </ul>
    </div>
</template>

<script setup>
import FlightService from '@/services/FlightService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = route.params.id;

const flight = ref(null);
FlightService.getFlightById(id)
    .then(rsp => flight.value = rsp.data)
</script>