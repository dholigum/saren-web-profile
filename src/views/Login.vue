<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="10" sm="8" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="indigo" dark flat>
                <v-toolbar-title>Login Administrator</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large to="/" v-on="on" class="pr-1">
                      <v-icon>mdi-home</v-icon>
                    </v-btn>
                  </template>
                  <span>Home</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Email"
                    v-model="email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo" @click="login" dark>Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" :top="true" class="mt-5">
          {{ textSnackbar }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Tutup</v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  props: {
    source: String
  },
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        v => !!v || "Mohon masukkan email",
        v => /.+@.+\..+/.test(v) || "Mohon isi dengan email valid"
      ],
      passwordRules: [
        v => !!v || "Mohon masukkan password",
        v => v.length >= 6 || "Password harus lebih dari 6 karakter"
      ],
      snackbar: false,
      textSnackbar: ""
    };
  },
  methods: {
    login(e) {
      this.$refs.form.validate();
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.snackbar = true;
            this.textSnackbar = `Berhasil masuk sebagai ${user.email}`;
            this.$router.push("/");
          },
          err => {
            this.snackbar = true;
            this.textSnackbar = err.message;
          }
        );
      this.$forceUpdate()
      e.preventDefault();
    }
  }
};
</script>