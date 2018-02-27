<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a New Course</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateCourse">

          <!-- Course Title -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Title" id="title" v-model="title" required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- Course Category -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="category" label="Category" id="category" v-model="category" required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- Course Location -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="location" label="Location" id="location" v-model="location" required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- Course Start Date -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-dialog ref="dialog1" persistent v-model="modal" lazy full-width width="290px" :return-value.sync="startDate">
                <v-text-field slot="activator" prepend-icon="event" label="Start Date" v-model="startDate" readonly></v-text-field>
                <v-date-picker v-model="startDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog1.save(startDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>

          <!-- Course End Date -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-dialog ref="dialog2" persistent v-model="modal" lazy full-width width="290px" :return-value.sync="endDate">
                <v-text-field slot="activator" prepend-icon="event" label="End Date" v-model="endDate" readonly></v-text-field>
                <v-date-picker v-model="endDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog2.save(endDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>


          <!-- Submit Button -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Course</v-btn>
            </v-flex>
          </v-layout>
        </form>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <upload-button class="primary" title="CSV Upload" :selectedCallback="onCsvUpload"></upload-button>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
  import neatCsv from 'neat-csv';

  export default {
    data() {
      return {
        title: '',
        category: '',
        location: '',
        startDate: '',
        endDate: '',
        modal: false,
      };
    },
    computed: {
      formIsValid() {
        return this.title !== '' &&
          this.category !== '' &&
          this.location !== '' &&
          this.startDate !== '' &&
          this.endDate !== '';
      },
    },
    methods: {
      onCreateCourse() {
        if (!this.formIsValid) {
          return;
        }
        const courseData = {
          title: this.title,
          category: this.category,
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate,
        };
        this.$store.dispatch('createCourse', courseData)
          .then(this.$router.push('/courses'));
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
