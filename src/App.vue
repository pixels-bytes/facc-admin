<template>
  <v-app dark>

    <v-toolbar>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>FACC Admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-for="item in menuItems" :key="item.title">
        <v-btn flat>
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title ">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: 'restaurant', title: 'View Courses' },
        { icon: 'person', title: 'Profile' },
        { icon: 'face', title: 'Sign Up' },
        { icon: 'lock_open', title: 'Login' }
]
    };
  },
  name: 'App',
};
</script>
