<template>
  <v-container fluid>
    <v-row class="mt-5" align="center" justify="center">
      <v-card flat wrap color="#FAFAFA" class="text-h6 text-sm-h4 mt-3">Dashboard Admin</v-card>
    </v-row>
    <v-row class="mt-2" align="center" justify="center">
      <v-card
        flat
        wrap
        color="#FAFAFA"
        :width="responsiveCardWidth"
        class="text-caption text-sm-subtitle-1 text-center px-3 px-md-5 mt-3"
      >Selamat Datang di Dashboard Admin {{ currentUser }},<br /> Dashboard ini berfungsi untuk menambahkan, mengubah, dan menghapus konten website</v-card>
    </v-row>
    <v-row align="center" justify="center" class="my-3">
      <HomeAdmin />
    </v-row>
    <v-row align="center" justify="center" class="my-3">
      <PosterAdmin v-if="isSuperAdmin" />
    </v-row>
    <v-row align="center" justify="center" class="my-3">
      <VideoAdmin v-if="isSuperAdmin" />
    </v-row>
    <v-row align="center" justify="center" class="my-3">
      <EbookAdmin v-if="isSuperAdmin" />
    </v-row>
    <v-row align="center" justify="center" class="my-3">
      <QuesionerAdmin v-if="isSuperAdmin" />
    </v-row>
    <v-row align="center" justify="center" class="my-3">
      <PodcastAdmin v-if="isSuperAdmin" />
    </v-row>
    <v-row align="center" justify="center" class="my-3">
      <MarketplaceAdmin />
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";

import HomeAdmin from "@/components/admin/HomeAdmin.vue";
import PosterAdmin from "@/components/admin/PosterAdmin.vue";
import VideoAdmin from "@/components/admin/VideoAdmin.vue";
import EbookAdmin from "@/components/admin/EbookAdmin.vue";
import QuesionerAdmin from "@/components/admin/QuesionerAdmin.vue";
import PodcastAdmin from "@/components/admin/PodcastAdmin.vue";
import MarketplaceAdmin from "@/components/admin/MarketplaceAdmin.vue";

export default {
  name: "Admin",
  components: {
    HomeAdmin,
    PosterAdmin,
    VideoAdmin,
    EbookAdmin,
    QuesionerAdmin,
    PodcastAdmin,
    MarketplaceAdmin,
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: ""
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
  computed: {
    responsiveCardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "500px";
        case "sm":
          return "700px";
        case "md":
          return "900px";
        case "lg":
          return "1200px";
        case "xl":
          return "1400px";
        default:
          return "300px";
      }
    },
    isSuperAdmin() {
      return this.currentUser === 'syahrulfadholi69@gmail.com'
    }
  }
};
</script>