<template>
  <v-app dark>
    <v-toolbar>
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>FACC Admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>restaurant</v-icon>
          View Courses
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>restaurant</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>View Courses</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>

    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      clipped: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
  name: 'App',
};
</script>
