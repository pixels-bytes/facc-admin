<template>
  <v-card>
    <v-card-title>
      <h2>Course List</h2>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="courses" :search="search">
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.category }}</td>
        <td>{{ props.item.startDate | date }}</td>
        <td>{{ props.item.endDate | date }}</td>
        <td>{{ props.item.location }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>


<script>
  export default {
    data() {
      return {
        search: '',
        headers: [
          { text: 'Course Title', value: 'title' },
          { text: 'Category', value: 'category' },
          { text: 'Start Date', value: 'startDate' },
          { text: 'End Date', value: 'endDate' },
          { text: 'Location', value: 'location' },
        ],
      };
    },

    computed: {
      courses() {
        return this.$store.getters.courses;
      },
    },
  };
</script>