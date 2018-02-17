<template>
  <v-card>
    <v-card-title>
      Courses
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="courses" :search="search">
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.category }}</td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.location }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>



<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'Course Title', value: 'title' },
          { text: 'Category', value: 'date' },
          { text: 'Course Date', value: 'category' },
          { text: 'Location', value: 'location' },
        ],
      }
    },

    computed: {
      courses () {
        return this.$store.getters.courses;
      }
    },
  }
</script>