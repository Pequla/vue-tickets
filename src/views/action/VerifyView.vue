<template>
  <div class="mx-auto text-center w-50 p-3 m-3 border border-success rounded">
    <h3>Successfully verified email</h3>
    <p>You can close this page now</p>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import UserService from "@/services/UserService";

const route = useRoute()
const token = route.params.token;

UserService.verifyEmail(token);
</script>
<style scoped>

</style>