<template>
  <v-card>

    <!-- Main Title & Search -->
    <v-card-title>
      <v-layout row>
        <v-flex xs6>
          <h2>Course List</h2>
        </v-flex>
        <v-flex xs1 mt-3>
          <app-info :heading="filterHeading" :text="filterInfo"></app-info>
        </v-flex>
        <v-flex xs5>
          <v-text-field append-icon="search" label="Filter Courses" single-line hide-details v-model="search"></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-title><!-- main title & search-->

    <v-card-actions>
      <course-dialog @courseSaved="onCreateCourse"></course-dialog>

      <upload-button class="primary" title="CSV Upload" :selectedCallback="onCsvUpload"></upload-button>
    </v-card-actions>

    <!-- Date Table -->
    <v-data-table :headers="headers" :items="courses" :search="search" :loading="loading" no-data-text="No Courses Available">

      <!-- Progress Bar -->
      <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>

      <!-- Data Table Items -->
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.category }}</td>
          <td>{{ props.item.startDate | date }}</td>
          <td>{{ props.item.endDate | date }}</td>
          <td>{{ props.item.location }}</td>
        </tr>
      </template><!-- data table items -->

      <!-- Data Table Item Buttons -->
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>
            <v-btn flat color="primary">Edit</v-btn>
            <v-btn flat color="primary" @click.native="deleteCourse(props.item.id)">Delete</v-btn>
          </v-card-text>
        </v-card>
      </template><!-- data table item buttons -->

      <!-- Search Fail Warning -->
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert><!-- search fail warning -->

    </v-data-table><!-- data table -->
  </v-card>
</template>


<script>
  import neatCsv from 'neat-csv';

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
        filterHeading: 'Filtering Courses',
        filterInfo: 'Type to dynamically filter course titles, locations, categories, as well as dates. For dates use numbers (e.g. - 03 for March & 03-08 for 8th of March)',
      };
    },

    computed: {
      courses() {
        return this.$store.getters.courses;
      },
      loading() {
        return this.$store.getters.loading;
      },
    },
    methods: {
      onCreateCourse(course) {
        const courseData = {
          title: course.title,
          category: course.category,
          location: course.location,
          startDate: course.startDate,
          endDate: course.endDate,
        };
        this.$store.dispatch('createCourse', courseData);
      },
      deleteCourse(id) {
        this.$store.dispatch('deleteCourse', id);
      },
      onCsvUpload(file) {
        // TODO: Trim spaces in incoming file
        // TODO: Checks
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          neatCsv(reader.result).then(
            (courses) => {
              courses.forEach((course) => {
                this.$store.dispatch('createCourse', course);
              });
              this.$router.push('/courses');
            },
          );
        };
      },
    },
  };
</script>
