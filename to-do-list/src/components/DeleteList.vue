<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error ma-1" v-bind="attrs" v-on="on" small> Delete </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Are you sure you want to Delete?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="closeModal()"> Cancel </v-btn>
        <v-btn color="green darken-1" text @click="deleteToDo(deleteTask)">
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    dialog: false,
  }),
  props: {
    deleteTask: String,
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },
    async deleteToDo(id: any) {
      try {
        await axios
          .post(`http://localhost:8000/to_do_list/delete`, {
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
