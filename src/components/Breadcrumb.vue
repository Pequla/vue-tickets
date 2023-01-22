<template>
  <nav aria-label="breadcrumb" class="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-if="root">
        <router-link :to="root.to">{{ root.name }}</router-link>
      </li>
      <li class="breadcrumb-item" v-else>
        <router-link to="/">Home</router-link>
      </li>
      <li class="breadcrumb-item" v-for="crumb in crumbs">
        <router-link v-if="crumb.url" :to="crumb.url">{{ crumb.text }}</router-link>
        <span v-else>{{ crumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import {toRefs} from 'vue'

const props = defineProps({
  crumbs: Array,
  root: Object
});
const {crumbs, root} = toRefs(props);
</script>

<style scoped>
.breadcrumb {
  --bs-breadcrumb-divider: '>';
}
</style>