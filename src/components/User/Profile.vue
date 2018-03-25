<template>
  <v-card>

    <!-- Title -->
    <v-card-title>
      <v-layout row>
        <v-flex xs6>
          <h2>Welcome {{ user.displayName }}</h2>
        </v-flex>
      </v-layout>
    </v-card-title>
    <!-- title -->

    <!-- Profile -->
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs3>
            <v-card color="secondary" class="white--text">
              <v-card-title primary-title>
                <h3>Profile</h3>
              </v-card-title>
              <v-card-text>
                <li>Name: </li>
              </v-card-text>
              <v-card-actions>
                <v-btn flat dark>Edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card><!-- profile -->

    <!-- Account -->
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs3>
            <v-card color="secondary" class="white--text">
              <v-card-title primary-title>
                <h3>Account</h3>
              </v-card-title>
              <v-card-text>
                <li>Subscription: </li>
              </v-card-text>
              <v-card-actions>
                <v-btn flat dark>Edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card><!-- account -->

  </v-card>
</template>



<script>
  export default {
    computed: {
      user() {
        return this.$store.getters.user;
      },
    },
  };

</script>
