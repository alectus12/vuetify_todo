<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-snackbar v-model="snackbar" :color="status_color" :timeout="5000">
      {{ notif_text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="deep-purple accent-4"
          icons-and-text
          dark
          grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginUsername"
                        :rules="[rules.required]"
                        label="Username"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginPassword"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :rules="[rules.required]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 4 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="validateLogin"
                        :loading="loading"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registerUsername"
                        :rules="[rules.required]"
                        label="Username"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registerPassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="validateSignup"
                        :loading="loading"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  created() {
    if (
      localStorage.getItem("user_authenticated") !== null &&
      localStorage.getItem("user_authenticated") == "true"
    ) {
      this.$router.push({ path: "/" });
      this.$router.go(0);
    }
  },
  computed: {
    passwordMatch() {
      return () =>
        this.registerPassword === this.verify || "Password must match";
    },
  },
  methods: {
    async validateLogin() {
      if (
        (
          this.$refs.loginForm as Vue & { validate: () => boolean }
        ).validate() == true
      ) {
        this.loading = true;
        try {
          await axios
            .post("http://localhost:8000/user/login", {
              user_name: this.loginUsername,
              password: this.loginPassword,
            })
            .then((response) => {
              if (response.data.success == false) {
                this.loading = false;
                this.notif_text = response.data.message;
                this.snackbar = true;
                this.status_color = "error";
              } else {
                this.loading = false;
                this.notif_text = response.data.message;
                this.snackbar = true;
                this.status_color = "success";
                this.loginUsername = "";
                this.loginPassword = "";
                localStorage.setItem(
                  "user_authenticated",
                  response.data.authenticate
                );
                this.$router.go(0);
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
    async validateSignup() {
      if (
        (
          this.$refs.registerForm as Vue & { validate: () => boolean }
        ).validate() == true
      ) {
        this.loading = true;
        try {
          await axios
            .post("http://localhost:8000/user/register", {
              user_name: this.registerUsername,
              password: this.registerPassword,
              created_date: new Date(),
            })
            .then((response) => {
              if (response.data.success == false) {
                this.loading = false;
                this.notif_text = response.data.message;
                this.snackbar = true;
                this.status_color = "error";
              } else {
                this.loading = false;
                this.notif_text = response.data.message;
                this.snackbar = true;
                this.status_color = "success";
                this.registerUsername = "";
                this.registerPassword = "";
                this.verify = "";
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  data: () => ({
    loading: false,
    dialog: true,
    tab: 0,
    snackbar: false,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,
    notif_text: "",
    status_color: "success",
    registerUsername: "",
    registerPassword: "",
    verify: "",
    loginPassword: "",
    loginUsername: "",
    show1: false,
    rules: {
      required: (value: any) => !!value || "Required.",
      min: (v: string | any) => (v && v.length >= 4) || "Min 4 characters",
    },
  }),
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
