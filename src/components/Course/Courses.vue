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

    <!-- Popup Dialog -->
    <v-dialog v-model="dialog" max-width="500px">

      <!-- Create New Course Button -->
      <v-btn color="primary" dark slot="activator" class="mb-2">Create New Course</v-btn>
      <v-card>

        <!-- Dialog Title -->
        <v-card-title>
          <span class="headline">Create New Course</span>
        </v-card-title><!-- dialog title -->

        <!-- Dialog Content -->
        <v-card-text>
          <v-container grid-list-md>

            <!-- Dialog Course Title -->
            <v-layout row>
              <v-flex xs12>
                <v-text-field name="title" label="Title" id="title" v-model="title" required>
                </v-text-field>
              </v-flex>
            </v-layout><!-- dialog course title -->

            <!-- Dialog Course Category -->
            <v-layout row>
              <v-flex>
                <v-text-field name="category" label="Category" id="category" v-model="category" required>
                </v-text-field>
              </v-flex>
            </v-layout><!-- dialog course category -->

            <!-- Dialog Course Location -->
            <v-layout row>
              <v-flex xs12>
                <v-text-field name="location" label="Location" id="location" v-model="location" required>
                </v-text-field>
              </v-flex>
            </v-layout><!-- dialog course location -->

            <!-- Dialog Course Start Date -->
            <v-layout row>
              <v-flex xs12>
                <v-dialog ref="dialog1" persistent v-model="modal" full-width width="290px" :return-value.sync="startDate">
                  <v-text-field slot="activator" prepend-icon="event" label="Start Date" v-model="startDate" readonly></v-text-field>
                  <v-date-picker v-model="startDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog1.save(startDate)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout><!-- dialog course start date -->

            <!-- Dialog Course End Date -->
            <v-layout row>
              <v-flex xs12>
                <v-dialog ref="dialog2" persistent v-model="modal" lazy full-width width="290px" :return-value.sync="endDate">
                  <v-text-field slot="activator" prepend-icon="event" label="End Date" v-model="endDate" readonly></v-text-field>
                  <v-date-picker v-model="endDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog2.save(endDate)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout><!-- dialog course end date -->

          </v-container>
        </v-card-text><!-- dialog content -->

        <!-- Dialog Buttons -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions><!-- dialog buttons -->

      </v-card>
    </v-dialog><!-- popup dialog -->

    OR

    <upload-button class="primary" title="CSV Upload" :selectedCallback="onCsvUpload"></upload-button>

    <!-- Date Table -->
    <v-data-table :headers="headers" :items="courses" :search="search" :loading="loading">

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
        editedItem: {},
        dialog: false,
        modal: false,
        title: '',
        category: '',
        location: '',
        startDate: '',
        endDate: '',
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
      close() {
        this.dialog = false;
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
