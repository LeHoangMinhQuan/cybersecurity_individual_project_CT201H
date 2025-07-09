<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const logs = ref([]);

async function fetchLogs() {
  const res = await axios.get(`${import.meta.env.BASE_URL}api/v1/detect/logs`);
  console.log('Fetched logs:', res.data); // ADD THIS
  logs.value = res.data.reverse();
}

onMounted(fetchLogs);
</script>
<template>
    <div class="p-4">
      <h1 class="text-xl font-bold">Traffic Dashboard</h1>
      <button @click="fetchLogs">Refresh Logs</button>
      <ul>
        <li v-for="log in logs" :key="log.timestamp">
          [{{ log.prediction }}] {{ log.method }} {{ log.path }} at {{ log.timestamp }}
        </li>
      </ul>
    </div>
  </template>
  
  