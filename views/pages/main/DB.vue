<template>
  <div>
    <h1>Database Info</h1>
    <p>People: {{ databaseInfo.people }}</p>
    <p>Age: {{ databaseInfo.age }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      databaseInfo: null
    };
  },
  created() {
    this.fetchDatabaseInfo();
  },
  methods: {
    fetchDatabaseInfo() {
      axios.get('/api/database')
        .then(response => {
          this.databaseInfo = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
