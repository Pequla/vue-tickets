<template>
  <div class="mx-auto text-center w-50 p-3 m-3">
    <h3>Goodbye!</h3>
    <p>
      <router-link to="/">Go home</router-link>
      or
      <router-link to="/action/login">go back to login</router-link>
    </p>
  </div>
</template>

<script setup>
if (localStorage.getItem('token')) {
  localStorage.removeItem('token');
  window.location.reload();
}
</script>

<style scoped>

</style>