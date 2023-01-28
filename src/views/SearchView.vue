<template>
  <div class="flights">
    <Breadcrumb :crumbs="crumbs"></Breadcrumb>
    <FlightPage :repository="getFlightsForDestination"></FlightPage>
  </div>
</template>

<script setup>
import FlightService from '@/services/FlightService'
import {useRoute} from "vue-router";
import Breadcrumb from "@/components/Breadcrumb.vue";
import router from "@/router";
import FlightPage from "@/components/flight/FlightPage.vue";

const route = useRoute()
const dest = route.params.dest;
const crumbs = [{text: 'Search'}]

function getFlightsForDestination(page, size) {
  return FlightService.getFlightsByDestination(dest, page, size);
}

router.afterEach((to, from, failure) => {
  if (!failure) document.location.reload();
})
</script>

<style scoped>

</style>