<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success ma-1" v-bind="attrs" v-on="on" small>
        Complete
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Good Job! Do you want to close this task?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="closeModal()"> Cancel </v-btn>
        <v-btn color="green darken-1" text @click="complete(completeTask)">
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data: () => ({
    dialog: false,
  }),
  props: {
    completeTask: String,
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },
    async complete(id: number) {
      try {
        await axios
          .put("http://localhost:8000/to_do_list/complete/" + id, {
            completed_date: new Date(),
            status: "done",
            id: id,
          })
          .then(() => {
            this.closeModal();
            this.$router.go(0);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>
