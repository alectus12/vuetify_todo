<template>
  <v-app>
    <NavBar />
    <v-content class="mx-5 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: { NavBar },
  data: () => ({
    //
  }),
});
</script>
