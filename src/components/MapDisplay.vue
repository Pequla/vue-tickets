<template>
  <div class="row mb-3">
    <div class="col">
      <GoogleMap :api-key="token" style="width: 100%; height: 480px" :center="data.center" :zoom="data.zoom"
                 map-type-id="terrain">
        <Marker v-for="marker in data.markers" :options="{ position: marker.position }"
                @click="onMarkerClick(marker.id)"/>
      </GoogleMap>
    </div>
  </div>
</template>

<script setup>
import {GoogleMap, Marker} from "vue3-google-map";
import {toRefs} from 'vue'
import router from "@/router";

const props = defineProps({
  data: Object
});
const {data} = toRefs(props);
const token = process.env.VUE_APP_MAPS_API_KEY;

function onMarkerClick(id) {
  console.log('Clicked on marker: ' + id)
  router.push('/flight/' + id)
}
</script>

<style scoped>

</style>