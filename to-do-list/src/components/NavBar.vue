<template>
  <nav>
    <v-snackbar v-model="snackbar" color="success" :timeout="3000">
      {{ notif_text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-toolbar dark>
      <v-icon>mdi-clipboard-text</v-icon>
      <h2>To-Do A Doodle do</h2>
      <v-spacer></v-spacer>
      <AddList @taskAdded="snackbar = true" />
      <v-spacer></v-spacer>
      <v-btn flat v-for="route in routes" :key="route.text" :to="route.link">
        <v-icon>{{ route.icon }}</v-icon>
        {{ route.text }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat>Login</v-btn>
      <v-btn flat>Logout</v-btn>
      <v-btn color="purple darken-3">Sign Up</v-btn>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import AddList from "./AddList.vue";

export default Vue.extend({
  components: { AddList },
  data: () => ({
    drawer: false,
    group: null,
    routes: [
      { icon: "mdi-view-list", text: "To-Do List", link: "/" },
      {
        icon: "mdi-clipboard-check",
        text: "Completed List",
        link: "/completed_list",
      },
    ],
    snackbar: false,
    notif_text: "Success Adding New Task",
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
});
</script>
