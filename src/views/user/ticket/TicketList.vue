<template>
  <Breadcrumb :crumbs="[{text: 'Tickets'}]"></Breadcrumb>
  <div v-if="tickets && tickets.length > 0">
  <table class="table table-striped">
    <thead>
    <tr>
      <th scope="col">TICKET ID</th>
      <th scope="col">FLIGHT NUMBER</th>
      <th scope="col">DESTINATION</th>
      <th scope="col">SCHEDULED AT</th>
      <th scope="col">AIRLINE</th>
      <th scope="col">COUNT</th>
      <th scope="col">ACTIONS</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="ticket in tickets">
      <th scope="row">{{ ticket.id }}</th>
      <th>{{ ticket.flight.flightNumber }}</th>
      <td>{{ ticket.flight.destination }}</td>
      <td>{{ new Date(ticket.flight.scheduledAt).toLocaleString('sr-SR') }}</td>
      <td>{{ ticket.airline }}</td>
      <td>{{ ticket.count }}</td>
      <td>
        <router-link :to="('/user/ticket/' + ticket.id + '/barcode')" class="btn btn-success m-1">Show Barcode
        </router-link>
        <router-link :to="('/user/ticket/' + ticket.id)" class="btn btn-secondary m-1">More Details</router-link>
      </td>
    </tr>
    </tbody>
  </table>
  </div>
  <div v-else>
    You dont have any tickets :(
  </div>
</template>

<script setup>
import {ref} from "vue";
import UserService from "@/services/UserService";
import Breadcrumb from "@/components/Breadcrumb.vue";

const tickets = ref()
UserService.getTickets().then(rsp => {
  tickets.value = rsp.data
})
</script>

<style scoped>

</style>