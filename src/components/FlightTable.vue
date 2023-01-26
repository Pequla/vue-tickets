<template>
  <div v-if="result && (result.content).length === 0" class="mx-auto text-center">
    <p>Sorry, no flights have been found
    <br/>Here is a cat to cheer you up!</p>
    <img src="@/assets/img/maxwell.gif" class="w-200px" alt="loading animation"/>
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
          <button class="page-link" @click="firstPage">First</button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="previousPage">Previous</button>
        </li>
        <li class="page-item" v-if="!result.first">
          <button class="page-link" @click="retrieveData(result.number - 1, result.size)">{{
              result.number
              - 1
            }}
          </button>
        </li>
        <li class="page-item active">
          <button class="page-link" @click="retrieveData(result.number, result.size)">{{
              result.number
            }}
          </button>
        </li>
        <li class="page-item" v-if="!result.last">
          <button class="page-link" @click="retrieveData(result.number + 1, result.size)">{{
              result.number
              + 1
            }}
          </button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="lastPage">Last</button>
        </li>
      </ul>
    </nav>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">FLIGHT</th>
        <th scope="col">DESTINATION</th>
        <th scope="col">GATE</th>
        <th scope="col">AIRPLANE MODEL</th>
        <th scope="col">DEPARTURE SCHEDULED</th>
        <th scope="col">DEPARTURE ESTIMATED</th>
        <th scope="col">ACTIONS</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="flight in result.content">
        <th scope="row">{{ flight.flightNumber }}</th>
        <td>{{ flight.destination }}</td>
        <td>{{ flight.gate }}</td>
        <td>{{ flight.plane }}</td>
        <td>{{ new Date(flight.scheduledAt).toLocaleString('sr-SR') }}</td>
        <td v-if="flight.estimatedAt">{{ new Date(flight.estimatedAt).toLocaleString('sr-SR') }}</td>
        <td v-else>N/A</td>
        <td>
          <router-link :to="('/flight/' + flight.id)" class="btn btn-secondary m-1">More
            Details
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="mx-auto text-center" v-else>
    <p>Please wait, loading flight data</p>
    <img src="@/assets/img/maxwell.gif" class="w-200px" alt="loading animation"/>
  </div>
</template>

<script setup>
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

// Previus Page
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
.w-200px {
  width: 200px;
}
</style>