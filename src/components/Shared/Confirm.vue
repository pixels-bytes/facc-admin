<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn flat color="primary" slot="activator">{{ button }}</v-btn>
      <v-card>
        <v-card-title class="headline">{{ headline }}</v-card-title>
        <v-card-text>{{ text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="onAgree">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: ['button', 'headline', 'text'],
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
      onAgree() {
        this.$emit('agreed');
        this.dialog = false;
      },
    },
  };
</script>
