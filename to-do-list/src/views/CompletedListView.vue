<template>
  <div class="completed-list">
    <h1>Welcome to the Completed List</h1>
    <v-container class="my-7">
      <v-card class="pa-5 mb-1" v-for="task in tasklist" :key="task.id">
        <v-layout row :class="`pa-3 to-do ${task.status}`">
          <v-flex xs2>
            <div class="caption">Task Name</div>
            <div class="font-weight-bold">{{ task.task_name }}</div>
          </v-flex>
          <v-flex xs4>
            <div class="caption">Task Details</div>
            <div class="font-weight-bold">{{ task.details }}</div>
          </v-flex>
          <v-flex xs2>
            <div class="caption">Created Date</div>
            <div class="font-weight-bold">{{ task.created_date }}</div>
          </v-flex>
          <v-flex xs2 class="d-flex justify-space-around">
            <div>
              <v-chip :class="`${task.status} white--text caption my-2`">{{
                task.status
              }}</v-chip>
            </div>
          </v-flex>
          <v-flex xs2>
            <div class="caption">Completion Date</div>
            <div class="font-weight-bold">{{ task.completed_date }}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    tasklist: [
      // {
      //   title: "Task # 5",
      //   details: "Description #5 ",
      //   created_at: "2023-02-23",
      //   status: "done",
      // },
    ],
  }),
  created() {
    this.getToDoList();
  },
  methods: {
    async getToDoList() {
      try {
        const response = await axios.get(
          "http://localhost:8000/completed_list"
        );
        this.tasklist = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style scoped>
.to-do.done {
  border-left: 4px solid green;
}

.v-chip.done {
  background: green;
}
</style>
