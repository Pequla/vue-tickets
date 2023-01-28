<template>
  <div v-if="result && (result.content).length === 0" class="mx-auto text-center">
    <h3>Sorry, no flights have been found</h3>
    <img src="@/assets/img/plane.gif" class="w-50" alt="no flights animation"/>
  </div>
  <div v-else-if="result && (result.content).length > 0">
    <nav>
      <ul class="pagination justify-content-start">
        <li class="page-item">
          <select class="form-select" v-model="size" @change="changeSize">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </li>
        <li class="page-item">
          <button class="page-link text-success" @click="firstPage">First</button>
        </li>
        <li class="page-item">
          <button class="page-link text-success" @click="previousPage">Previous</button>
        </li>
        <li class="page-item" v-if="!result.first">
          <button class="page-link text-success" @click="retrieveData(result.number - 1, result.size)">{{
              result.number
              - 1
            }}
          </button>
        </li>
        <li class="page-item custom-active">
          <button class="page-link custom-page-link" @click="retrieveData(result.number, result.size)">{{
              result.number
            }}
          </button>
        </li>
        <li class="page-item" v-if="!result.last">
          <button class="page-link text-success" @click="retrieveData(result.number + 1, result.size)">{{
              result.number
              + 1
            }}
          </button>
        </li>
        <li class="page-item">
          <button class="page-link text-success" @click="nextPage">Next</button>
        </li>
        <li class="page-item">
          <button class="page-link text-success" @click="lastPage">Last</button>
        </li>
      </ul>
    </nav>
    <FlightTable :flights="result.content"></FlightTable>
  </div>
  <LoadingWidget v-else></LoadingWidget>
</template>

<script setup>
import FlightTable from "@/components/flight/FlightTable.vue";
import LoadingWidget from "@/components/LoadingWidget.vue";
import {ref, toRefs} from 'vue'

const props = defineProps({
  repository: Function
});
const {repository} = toRefs(props);

const result = ref(null)
const size = ref(10)

function retrieveData(p = 0, s = size.value) {
  repository.value(p, s)
      .then(rsp => {
        result.value = rsp.data
      }).catch(e => console.log(e.message));
}

// Initial call
retrieveData();

// Next Page
const nextPage = () => {
  if (result.value.last) return;
  retrieveData(result.value.number += 1, result.value.size)
}

// Previous Page
const previousPage = () => {
  if (result.value.first) return;
  retrieveData(result.value.number -= 1, result.value.size)
}

// First Page
const firstPage = () => {
  if (result.value.first) return;
  retrieveData()
}

// Last Page
const lastPage = () => {
  if (result.value.last) return;
  retrieveData(result.value.totalPages - 1)
}

// Change Size
const changeSize = (e) => {
  retrieveData(0, e.target.value)
}
</script>

<style scoped>
.custom-active {
  background-color: #198754 !important;
  border-color: #198754 !important;
}

.custom-page-link {
  color: white;
  background: #198754;
}
</style>