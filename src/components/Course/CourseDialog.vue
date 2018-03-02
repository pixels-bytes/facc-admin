<template>
  <!-- Popup Dialog -->
  <v-dialog max-width="500px" v-model="dialog">

    <!-- Create New Course Button -->
    <v-btn color="primary" dark slot="activator" class="mb-2">Create New Course</v-btn>


    <v-card>

      <!-- Dialog Title -->
      <v-card-title>
        <span class="headline">Create New Course</span>
      </v-card-title>
      <!-- dialog title -->

      <!-- Dialog Content -->
      <v-card-text>
        <v-container grid-list-md>

          <!-- Dialog Course Title -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="title" label="Title" id="title" v-model="course.title" required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <!-- dialog course title -->

          <!-- Dialog Course Category -->
          <v-layout row>
            <v-flex>
              <v-text-field name="category" label="Category" id="category" v-model="course.category" required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <!-- dialog course category -->

          <!-- Dialog Course Location -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="location" label="Location" id="location" v-model="course.location" required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <!-- dialog course location -->

          <!-- Dialog Course Start Date -->
          <v-layout row>
            <v-flex xs12>
              <v-dialog ref="startDate" persistent v-model="startDatePicker" lazy full-width width="290px" :return-value.sync="course.startDate">
                <v-text-field slot="activator" label="Start Date" v-model="course.startDate" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="course.startDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="startDatePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.startDate.save(course.startDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout><!-- dialog course start date -->

          <!-- Dialog Course End Date -->
          <v-layout row>
            <v-flex xs12>
              <v-dialog ref="endDate" persistent v-model="endDatePicker" lazy full-width width="290px" :return-value.sync="course.endDate">
                <v-text-field slot="activator" label="Start Date" v-model="course.endDate" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="course.endDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="endDatePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.endDate.save(course.endDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout><!-- dialog course end date -->

        </v-container>
      </v-card-text>
      <!-- dialog content -->

      <!-- Dialog Buttons -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.native="onClose" class="primary">Cancel</v-btn>
        <v-btn @click.native="onSave" class="primary" :disabled="!formIsValid">Save</v-btn>
      </v-card-actions>
      <!-- dialog buttons -->

    </v-card>
  </v-dialog>
  <!-- popup dialog -->
</template>


<script>
export default {
  data() {
    return {
      modal: false,
      startDatePicker: false,
      endDatePicker: false,
      dialog: false,
      course: {
        title: '',
        category: '',
        location: '',
        startDate: '',
        endDate: '',
      },
    };
  },
  computed: {
    formIsValid() {
      return this.course.title !== '' &&
        this.course.category !== '' &&
        this.course.location !== '' &&
        this.course.startDate !== '' &&
        this.course.endDate !== '';
    },
  },
  methods: {
    onClose() {
      this.dialog = false;
    },
    onSave() {
      this.$emit('courseSaved', this.course);
      this.dialog = false;
    },
  },
};
</script>
