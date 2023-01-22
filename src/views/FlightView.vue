<template>
    <div class="flights">
        <h1>Flights</h1>
        <FlightTable :repository="FlightService.getFlights"></FlightTable>
    </div>
</template>

<script setup>
import FlightService from '@/services/FlightService'
import FlightTable from "@/components/FlightTable.vue";
</script>