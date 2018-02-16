<template>
  <v-card>
    <v-card-title>
      Courses
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
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
        items: [
          { 
            value: false,
            title: 'Making Curries Rock',
            category: 'Indian Cuisine',
            location: 'India',
            date: '2018-02-15'
            },
            { 
              value: false,
              title: 'Pizzas and Pastas',
              category: 'Italian Cuisine',
              location: 'Italy',
              date: '2018-02-16'
            },
            { 
              value: false,
              title: 'Paella',
              category: 'Spanish Cuisine',
              location: 'Spain',
              date: '2018-02-17'
            },
            { 
              value: false,
              title: 'Beyond Fish & Chips',
              category: 'British Cuisine',
              location: 'England',
              date: '2018-02-18'
            },
            { 
              value: false,
              title: 'Sushi',
              category: 'Japanese Cuisine',
              location: 'Japan',
              date: '2018-02-15'
            }
        ]
      }
    }
  }

</script>


