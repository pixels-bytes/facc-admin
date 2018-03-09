<template>
<v-card>
  <v-card-title>
      <v-layout row>
        <v-flex xs6>
          <h2>Profile</h2>
          <h3>Welcome {{ user.displayName }}</h3>
        </v-flex>
      </v-layout>
    </v-card-title>
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
