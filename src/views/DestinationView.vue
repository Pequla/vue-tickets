<template>
  <div class="flights">
    <Breadcrumb :crumbs="crumbs"></Breadcrumb>
    <h1>Destination Search</h1>
    <FlightTable :repository="getFlightsForDestination"></FlightTable>
  </div>
</template>

<script setup>
import FlightService from '@/services/FlightService'
import FlightTable from "@/components/FlightTable.vue";
import {useRoute} from "vue-router";
import Breadcrumb from "@/components/Breadcrumb.vue";
import router from "@/router";

const route = useRoute()
const dest = route.params.dest;
const crumbs = [{text: 'Destination Search'}, {text: dest}]

function getFlightsForDestination(page, size) {
  return FlightService.getFlightsByDestination(dest, page, size);
}

router.afterEach((to, from, failure) => {
  if (!failure) document.location.reload();
})
</script>

<style scoped>

</style>