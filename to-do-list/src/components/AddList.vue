<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="success">
        <v-icon class="pr-1">mdi-plus-circle-outline</v-icon>
        Create To-Do
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3>Add a new To-Do Item</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="px-3" v-mode="valid" lazy-validation>
          <v-text-field
            name="task_name"
            label="Task Name"
            v-model="task_name"
            prepend-icon="mdi-pencil"
            :rules="[rules.required]"
          ></v-text-field>
          <v-textarea
            label="Task Details"
            name="details"
            v-model="details"
            textarea
            prepend-icon="mdi-pencil"
            :rules="[rules.required]"
          ></v-textarea>
          <v-btn color="success mx-0" flat @click="add" :loading="loading"
            >Add Task</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data: () => ({
    task_name: "",
    valid: true,
    details: "",
    rules: {
      required: (value: any) => !!value || "Required.",
    },
    loading: false,
  }),
  methods: {
    async add() {
      if (
        (this.$refs.form as Vue & { validate: () => boolean }).validate() ==
        true
      ) {
        this.loading = true;
        try {
          await axios
            .post("http://localhost:8000/to_do_list", {
              task_name: this.task_name,
              details: this.details,
              created_date: new Date(),
              status: "ongoing",
            })
            .then(() => {
              this.task_name = "";
              this.details = "";
              this.$router.go(0);
              this.loading = false;
              this.$emit("taskAdded");
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
});
</script>
