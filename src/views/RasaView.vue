<template>
    <div class="rasa">
        <ul class="border border-2 border-primary list-unstyled">
            <li v-for="msg in messages">{{ msg }}</li>
        </ul>
        <div class="mb-3">
            <label for="user-input" class="form-label">Message:</label>
            <input type="text" class="form-control" id="user-input" v-model="input">
            <div class="form-text">Bot takes ~2 sec to respond, keep that in mind</div>
        </div>
        <button class="btn btn-secondary" @click="sendMessage">Send Message</button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const input = ref(null);
const token = (Math.random() + 1).toString(36).substring(7); // smth like bot session, important for stories
const messages = ['System: Connected to Rasa!', 'System: Wating for messages'];

const sendMessage = (event) => {
    messages.push('You: ' + input.value)
    axios.post('http://localhost:3200/api/rasa', {
        token: token,
        message: input.value
    }).then(rsp => {
        console.log(rsp)
        rsp.data.forEach(msg => {
            if (msg.recipient_id === token) {
                messages.push('Rasa: ' + element.text)
                // input.scrollIntoView() // need to find vue3 alt
            }
        });
    })

    input.value = null; // clear input
}
</script>