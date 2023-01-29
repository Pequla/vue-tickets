<template>
  <Breadcrumb :crumbs="[{text: 'About'}]"></Breadcrumb>
  <div class="about">
    <div class="card mb-3">
      <h5 class="card-header">Important Information</h5>
      <div class="card-body">
        <h5 class="card-title">Exam needs</h5>
        <p class="card-text">This application has been made specifically for my University exam and it does so by
          mocking a flight ticket ordering service of a certain travel agency. All the actions on this website are for
          pure educational use and shouldn't be used for any professional use case.
          <br/>The flight data in this application is real time data and can be used for informative purposes. The data
          is provided by Belgrade's Nikola Tesla Airport
        </p>
        <a href="https://github.com/Pequla/vue-tickets" class="btn btn-success">View source code</a>
      </div>
    </div>
    <h3>Vue Tickets</h3>
    <p>This app allows you to browse and book flights from the Nikola Tesla Airport in Belgrade Serbia</p>
    <h5>Services</h5>
    <p>Technologies used in this application range from vue3 and javascript to java and spring boot web framework<br>List
      of microservices:</p>
    <ul>
      <li><a href="https://github.com/Pequla/vue-tickets">Frontend built in Vue3 and Boostrap 5</a></li>
      <li><a href="https://github.com/Pequla/ticket-app">Main backend built in Spring Boot</a></li>
      <li><a href="https://github.com/Pequla/flight-cache">Flight caching service built in Spring Boot</a></li>
      <li><a href="https://github.com/Pequla/ticket-agent">Conversation agent built in Rasa Open Source</a></li>
      <li><a href="https://img.pequla.com/destination">Destination image service built with Apache2 Web Server</a></li>
    </ul>
    <h5>Features</h5>
    <p>Some of the features:</p>
    <ul>
      <li>Google Maps integration</li>
      <li>Destination Search</li>
      <li>Use of localstorage</li>
      <li>Realtime data</li>
      <li>User accounts</li>
      <li>Conversation agent</li>
      <li>Ticket booking information</li>
    </ul>
  </div>
</template>
<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";</script>