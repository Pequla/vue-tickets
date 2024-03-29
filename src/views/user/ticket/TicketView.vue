<template>
  <div v-if="ticket">
    <Breadcrumb :crumbs="crumbs"></Breadcrumb>
    <div class="row mb-3">
      <table class="table table-striped">
        <tbody>
        <tr>
          <th>TICKET ID</th>
          <th>{{ ticket.id }}</th>
        </tr>
        <tr>
          <th>FLIGHT NUMBER</th>
          <th>{{ ticket.flight.flightNumber }}</th>
        </tr>
        <tr>
          <th>DESTINATION</th>
          <th>{{ ticket.flight.destination }}</th>
        </tr>
        <tr>
          <th>SCHEDULED AT</th>
          <th>{{ new Date(ticket.flight.scheduledAt).toLocaleString('sr-SR') }}</th>
        </tr>
        <tr>
          <th>AIRLINE</th>
          <th>{{ ticket.airline }}</th>
        </tr>
        <tr>
          <th>COUNT</th>
          <th>{{ ticket.count }}</th>
        </tr>
        <tr>
          <th>TYPE</th>
          <th>{{ (ticket.oneWay) ? "One way" : "Return" }}</th>
        </tr>
        <tr>
          <th>REGISTERED AT</th>
          <th>{{ new Date(ticket.createdAt).toLocaleString('sr-SR') }}</th>
        </tr>
        <tr v-if="ticket.usedAt">
          <th>USED AT</th>
          <th>{{ new Date(ticket.usedAt).toLocaleString('sr-SR') }}</th>
        </tr>
        <tr>
          <th colspan="2">
            <router-link class="btn btn-success m-1" :to="'/user/ticket/'+ticket.id+'/qrcode'">Show Qrcode
            </router-link>
            <router-link class="btn btn-secondary m-1" :to="'/flight/'+ticket.flight.id">Flight Information
            </router-link>
            <button class="btn btn-danger m-1" @click="UserService.deleteTicket(ticket.id)">Delete Reservation</button>
          </th>
        </tr>
        </tbody>
      </table>
      <div v-if="ticket.usedAt">
        <h5>Your rating: ({{rating}})</h5>
        <vue3-star-ratings
            v-model="rating"
            starSize="45"
        />
      </div>
    </div>
    <MapDisplay :data="mapData"></MapDisplay>
  </div>
  <LoadingWidget v-else></LoadingWidget>
</template>

<script setup>
import {useRoute} from "vue-router";
import UserService from "@/services/UserService";
import {ref, watch} from "vue";
import LoadingWidget from "@/components/LoadingWidget.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import HereService from "@/services/HereService";
import MapDisplay from "@/components/MapDisplay.vue";
import Vue3StarRatings from "vue3-star-ratings";

const route = useRoute()
const id = route.params.id;

const ticket = ref();
const rating = ref();
const crumbs = ref();
const mapData = ref(null);

UserService.getTicketById(id).then(rsp => {
  updatePage(rsp)
  watch(rating, (nv, ov) => {
    if (nv !== ticket.value.rating)
      UserService.updateTicketRating(ticket.value.id, nv)
          .then(rsp => updatePage(rsp))
  })
})

function updatePage(rsp) {
  HereService.geocode(rsp.data.flight.destination)
      .then(coded => {
        ticket.value = rsp.data
        crumbs.value = [
          {url: '/user/ticket', text: 'Tickets'},
          {text: rsp.data.flight.flightKey}
        ]
        rating.value = rsp.data.rating;

        let pos = coded.data.items[0].position;
        mapData.value = {
          center: pos,
          zoom: 8,
          markers: [{
            id: rsp.data.id,
            position: pos
          }]
        }
      });
}

</script>

<style scoped>

</style>