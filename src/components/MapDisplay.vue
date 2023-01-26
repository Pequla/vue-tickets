<template>
  <div class="row mb-3">
    <div class="col">
      <GoogleMap :api-key="token" style="width: 100%; height: 480px" :center="center" :zoom="zoom"
                 map-type-id="terrain">
        <Marker v-for="marker in markers" :options="{ position: marker.position }" @click="onMarkerClick(marker.id)"/>
      </GoogleMap>
    </div>
  </div>
</template>

<script setup>
import {GoogleMap, Marker} from "vue3-google-map";
import {ref, toRefs} from 'vue'

const props = defineProps({
  markers: Array,
  center: Object
});
const {markers, center} = toRefs(props);
const zoom = ref(4);
// if (markers.value[0].position === center.value) zoom.value = 8
const token = process.env.VUE_APP_MAPS_API_KEY;

console.log(markers)

function onMarkerClick(id) {
  console.log('Clicked on marker: ' + id)
}
</script>

<style scoped>

</style>