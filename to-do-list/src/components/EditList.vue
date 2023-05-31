<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="warning ma-1"> Edit </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3>Edit To-Do Item</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="px-3" v-mode="valid" lazy-validation>
          <v-text-field
            name="task_name"
            label="Task Name"
            v-model="task_name"
            prepend-icon="mdi-pencil"
            :rules="formValidate"
            v-bind="editTask"
          ></v-text-field>
          <v-textarea
            label="Task Details"
            name="details"
            v-model="details"
            textarea
            prepend-icon="mdi-pencil"
            :rules="formValidate"
          ></v-textarea>
          <v-btn color="success mx-0" flat @click="update">Update Task</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data: () => ({
    id: "",
    task_name: "",
    details: "",
    valid: true,
    formValidate: [(v: string) => v.length > 0 || "Please add content"],
  }),
  props: {
    editTask: Object,
  },
  created() {
    this.id = this?.editTask?.id;
    this.task_name = this?.editTask?.task_name;
    this.details = this?.editTask?.details;
  },
  methods: {
    async update() {
      if (this.task_name.length > 0 && this.details.length > 0) {
        try {
          await axios.put("http://localhost:8000/to_do_list/" + this.id, {
            task_name: this.task_name,
            details: this.details,
            id: this.id,
          });
          this.$emit("taskUpdated");
          this.$router.go(0);
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
});
</script>
