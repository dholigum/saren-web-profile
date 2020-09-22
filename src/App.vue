<template>
  <v-app>
    <v-card tile class="overflow-hidden">
      <v-app-bar
        absolute
        color="indigo"
        dark
        shrink-on-scroll
        prominent
        fade-img-on-scroll
        src="@/assets/ricefield-img-min.jpeg"
        scroll-target="#scrolling-techniques-2"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>

        <v-app-bar-nav-icon class="d-md-none" @click="navOpen"></v-app-bar-nav-icon>
        <v-toolbar-title class="pa-0 pl-5 text-subtitle-1 font-weight-bold text-sm-h5 text-wrap">
          <v-row align="end" class="pt-5">
            <v-col cols="1" class="pa-0">
              <v-img
                class="align-end pt-3"
                contain
                width="50px"
                height="50px"
                src="@/assets/rsz_1sleman-logo.png"
              ></v-img>
            </v-col>
            <v-col class="pa-0 pb-2 pl-3">Website Informasi Dusun Saren</v-col>
          </v-row>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip left v-if="!isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              to="/login"
              :class="isBreakpointMd ? 'd-none' : ''"
            >
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </template>
          <span>Login Admin</span>
        </v-tooltip>
        <v-tooltip left v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="logout"
              :class="isBreakpointMd ? 'd-none' : ''"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Logout Admin</span>
        </v-tooltip>

        <template v-slot:extension>
          <v-tabs :class="isBreakpointMd ? 'd-none' : ''" align-with-title>
            <v-tab @click="tabSwitch(0)" to="/">Home</v-tab>
            <v-tab @click="tabSwitch(1)" to="/galeri">Galeri</v-tab>
            <v-tab @click="tabSwitch(2)" to="/buku-panduan">Buku & Kuesioner</v-tab>
            <v-tab @click="tabSwitch(3)" to="/podcast">Podcast</v-tab>
            <v-tab @click="tabSwitch(4)" to="/marketplace">Marketplace</v-tab>
            <v-tab @click="tabSwitch(5)" v-if="isLoggedIn" to="/admin">Admin</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute dark color="indigo" width="300px">
        <v-row
          justify="center"
          align="center"
          class="white--text text-uppercase pa-4 my-3 font-weight-bold"
        >Menu Navigasi</v-row>
        <v-divider></v-divider>
        <v-tabs vertical background-color="indigo">
          <v-tab @click="tabSwitch(0)" to="/">Home</v-tab>
          <v-tab @click="tabSwitch(1)" to="/galeri">Galeri</v-tab>
          <v-tab @click="tabSwitch(2)" to="/buku-panduan">Buku & Kuesioner</v-tab>
          <v-tab @click="tabSwitch(3)" to="/podcast">Podcast</v-tab>
          <v-tab @click="tabSwitch(4)" to="/marketplace">Marketplace</v-tab>
          <v-tab @click="tabSwitch(5)" v-if="isLoggedIn" to="/admin">Admin</v-tab>
          <v-tab class="mt-5" align="end" to="/login" v-if="!isLoggedIn">
            <v-icon left>mdi-login</v-icon>Login Admin
          </v-tab>
          <v-tab class="mt-5" align="end" @click="logout" v-if="isLoggedIn">
            <v-icon left>mdi-logout</v-icon>Logout Admin
          </v-tab>
        </v-tabs>
      </v-navigation-drawer>

      <v-sheet
        id="scrolling-techniques-2"
        color="#FAFAFA"
        class="overflow-x-hidden overflow-y-auto pa-0"
        max-height="100vh"
      >
        <v-card fluid height="210px"></v-card>
        <router-view />
        <Footer />
      </v-sheet>

      <v-snackbar v-model="snackbar" :top="true" class="mt-5">
        {{ textSnackbar }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Tutup</v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import firebase from "firebase";

export default {
  name: "App",
  components: {
    Footer
  },
  data() {
    return {
      drawer: false,
      snackbar: false,
      textSnackbar: "",
      tabSelected: 0,
      isLoggedIn: false,
      currentUser: "",
      showLogIconButton: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user.email;
      }
    });
  },
  watch: {
    isLoggedIn() {
      if (!this.isBreakpointMd && this.isLoggedIn) {
        this.showLogIconButton = true;
      } else {
        this.showLogIconButton = false;
      }
    }
  },
  computed: {
    isBreakpointMd() {
      if (
        this.$vuetify.breakpoint.name === "md" ||
        this.$vuetify.breakpoint.name === "lg" ||
        this.$vuetify.breakpoint.name === "xl"
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    tabSwitch(val) {
      this.tabSelected = val;
    },
    navOpen() {
      this.drawer = !this.drawer;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
      this.snackbar = true;
      this.textSnackbar = "Berhasil logout";
      window.location.reload()
    }
  }
};
</script>

<style scoped>
.v-toolbar__content, .v-toolbar__extension {
  
}
</style>
