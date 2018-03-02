<template>
  <v-app>

    <v-toolbar class="primary" dark>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>

      <!-- Toolbar Title -->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Find a Cookery Course</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Toolbar Items -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!-- Toolbar Logout -->
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer temporary v-model="drawer" absolute="">
      <v-list>

        <!-- Navigation Items -->
        <v-list-tile v-for="item in menuItems" :key="item.title " router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <!-- Logout -->
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
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
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: 'face', title: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', title: 'Signin', link: '/signin' },
      ];

      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'restaurant', title: 'View Courses', link: '/courses' },
          { icon: 'person', title: 'Profile', link: '/profile' },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    },
  },
  name: 'App',
};
</script>
