<template>
  <div class="mx-auto text-center w-50 p-3 m-3 border border-success rounded">
    <h3>Goodbye!</h3>
    <p><router-link to="petar">Go home</router-link> or <router-link to="/action/login">go back to login</router-link></p>
  </div>
</template>

<script setup>
localStorage.removeItem('token')
</script>

<style scoped>

</style>