<template>
  <div class="completed-list">
    <h1>Welcome to the Deleted Content</h1>
    <v-container class="my-7">
      <v-card class="pa-5 mb-1" v-for="task in tasklist" :key="task.title">
        <v-layout row :class="`pa-3 to-do ${task.status}`">
          <v-flex xs2>
            <div class="caption">Task Name</div>
            <div class="font-weight-bold">{{ task.title }}</div>
          </v-flex>
          <v-flex xs4>
            <div class="caption">Task Details</div>
            <div class="font-weight-bold">{{ task.details }}</div>
          </v-flex>
          <v-flex xs2>
            <div class="caption">Created Date</div>
            <div class="font-weight-bold">{{ task.created_at }}</div>
          </v-flex>
          <v-flex xs2 class="d-flex justify-space-around">
            <div>
              <v-chip :class="`${task.status} white--text caption my-2`">{{
                task.status
              }}</v-chip>
            </div>
          </v-flex>
          <v-flex xs2>
            <div class="caption">Deleted Date</div>
            <div class="font-weight-bold">{{ task.deleted_date }}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    tasklist: [
      {
        title: "Task # 9",
        details: "Description #9 ",
        created_at: "2023-02-23",
        deleted_date: "2023-02-23",
        status: "deleted",
      },
    ],
  }),
});
</script>

<style scoped>
.to-do.deleted {
  border-left: 4px solid red;
}

.v-chip.deleted {
  background: red;
}
</style>
