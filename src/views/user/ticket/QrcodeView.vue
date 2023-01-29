<template>
  <div v-if="data">
    <Breadcrumb :crumbs="crumbs"></Breadcrumb>
    <div class="mx-auto text-center">
      <h3>Please only show this qrcode to our employees</h3>
      <QRCodeVue3
          :value="data"
          :dotsOptions="{
            type: 'squares',
            color: '#6c757d'
          }"
      />
      <p class="fw-bold">{{key}}</p>
    </div>
  </div>
  <LoadingWidget v-else></LoadingWidget>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import UserService from "@/services/UserService";
import LoadingWidget from "@/components/LoadingWidget.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import QRCodeVue3 from "qrcode-vue3";

const route = useRoute()
const id = route.params.id;

const data = ref()
const crumbs = ref();
const key = ref();
UserService.getTicketById(id).then(ticket => {
  UserService.getSelfUser().then(user => {
    key.value = ticket.data.flight.flightKey;
    data.value = JSON.stringify({
      id: ticket.data.id,
      dest: ticket.data.flight.destination,
      number: ticket.data.flight.flightNumber,
      key: ticket.data.flight.flightKey,
      count: ticket.data.count,
      name: user.data.name,
      email: user.data.email,
      country: user.data.country,
      city: user.data.city,
      address: user.data.address,
      phone: user.data.phone
    })
    crumbs.value = [
      {url: '/user/ticket', text: 'Tickets'},
      {url: '/user/ticket/' + ticket.data.id, text: ticket.data.flight.flightKey},
      {text: 'Qrcode'}
    ]
  })
})


</script>

<style scoped>

</style>