<template>
  <Breadcrumb :crumbs="[{text: 'About'}]"></Breadcrumb>
  <div class="about">
    <p>This app allows you to browse and book flights from the Nikola Tesla Airport in Belgrade Serbia</p>
    <ul>
      <li>Dodati proveru u backend da prikazuje samo tickets za letove koji nisu poletili tj after now</li>
      <li>Ticket creation mora da cita iz local storage ono sto je korisnik postavio kao i da menja local storage na ono sto je koristinik postavio u home page-u</li>
      <li>Reset password opcija</li>
      <li>U new user i user proffile staviti opciju da se sve popuni na osnovu Here API-ja</li>
    </ul>
  </div>
</template>
<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";</script>