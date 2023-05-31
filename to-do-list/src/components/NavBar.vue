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
      <AddList @taskAdded="snackbar = true" v-if="is_authenticated" />
      <v-spacer></v-spacer>

      <div v-if="is_authenticated">
        <v-btn flat v-for="route in routes" :key="route.text" :to="route.link">
          <v-icon>{{ route.icon }}</v-icon>
          {{ route.text }}
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn flat v-if="!is_authenticated" :to="`/login`">Login</v-btn>
      <v-btn flat v-if="is_authenticated" @click="logout()">Logout</v-btn>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddList from "./AddList.vue";

export default defineComponent({
  components: { AddList },
  data: () => ({
    drawer: false,
    is_authenticated:
      localStorage.getItem("user_authenticated") !== null &&
      localStorage.getItem("user_authenticated") == "true"
        ? true
        : false,
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
  methods: {
    logout() {
      localStorage.removeItem("user_authenticated");
      this.$router.push({ path: "/login" });
      this.$router.go(0);
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
});
</script>
