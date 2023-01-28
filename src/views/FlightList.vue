<template>
  <Breadcrumb :crumbs="[{text: 'Flights'}]"></Breadcrumb>
  <div class="flights">
    <FlightPage :repository="FlightService.getFlights"></FlightPage>
  </div>
</template>

<script setup>
import FlightService from '@/services/FlightService'
import Breadcrumb from "@/components/Breadcrumb.vue";
import FlightPage from "@/components/flight/FlightPage.vue";</script>