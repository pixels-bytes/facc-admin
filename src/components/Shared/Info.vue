<template>
  <v-layout row justify-end>

    <v-btn icon small @click.native.stop="dialog = true">
      <v-icon color="grey lighten-1">info_outline</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ heading }}</v-card-title>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: ['heading', 'text'],
    data() {
      return {
        dialog: false,
      };
    },
  };
</script>
