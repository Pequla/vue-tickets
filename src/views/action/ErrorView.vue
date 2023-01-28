<template>
  <div class="mx-auto text-center w-50 p-3 m-3">
    <h3>Oops! Something went wrong...</h3>
    <p>We are sorry for the inconvenience</p>
    <p v-if="msg">Some more error information:
      <br/> {{ msg }}
    </p>
    <p><img src="@/assets/img/plane.gif" alt="error image" class="w-100"></p>
  </div>
</template>

<script setup>
const msg = sessionStorage.getItem('error')
sessionStorage.removeItem('error');
</script>

<style scoped>

</style>