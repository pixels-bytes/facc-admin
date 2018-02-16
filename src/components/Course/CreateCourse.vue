<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a New Course</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="category"
                label="Category"
                id="category"
                v-model="category"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="start-date"
                label="Start Date"
                id="start-date"
                v-model="startDate"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="end-date"
                label="End Date"
                id="end-date"
                v-model="endDate"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid">Create Course</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data () {
    return {
      title: '',
      category: '',
      location: '',
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.category !== '' &&
        this.location !== '' &&
        this.startDate !== '' &&
        this.endDate !== ''; 
    }
  },
}
</script>
