<template>
  <div class="to-do-list">
    <v-snackbar v-model="snackbar" color="success" :timeout="3000">
      {{ notif_text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <h1>Welcome to the To-Do List</h1>
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
          <v-flex xs2 class="d-flex justify-space-around">
            <!-- <v-btn small color="success ma-1">Complete</v-btn> -->
            <CompleteTask :completeTask="task.id" />
            <EditList :editTask="task" @taskUpdated="snackbar = true" />
            <DeleteList :deleteTask="task.id" />
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import EditList from "@/components/EditList.vue";
import CompleteTask from "@/components/CompleteTask.vue";
import DeleteList from "@/components/DeleteList.vue";

export default Vue.extend({
  components: { EditList, CompleteTask, DeleteList },
  data: () => ({
    tasklist: [],
    snackbar: false,
    notif_text: "Success Updating Task",
    dialog: false,
  }),
  created() {
    this.getToDoList();
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },
    async getToDoList() {
      try {
        const response = await axios.get("http://localhost:8000/to_do_list");
        this.tasklist = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteToDo(id: any) {
      try {
        await axios
          .post(`http://localhost:8000/to_do_list/delete`, {
            id: id,
          })
          .then(() => {
            this.getToDoList();
            this.closeModal();
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style scoped>
.to-do.ongoing {
  border-left: 4px solid orange;
}

.to-do.done {
  border-left: 4px solid green;
}

.v-chip.ongoing {
  background: orange;
}

.v-chip.done {
  background: green;
}
</style>
