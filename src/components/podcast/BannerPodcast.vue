<template>
  <v-card flat tile dark width="100%" class="my-3">
    <v-img
      :src="require('@/assets/podcast-view.jpeg')"
      class="grey lighten-2"
      height="400"
      width="100%"
    >
      <v-row class="fill-height pa-3" align="center">
        <v-col class="wrap" cols="12" md="7" offset="1">
          <h1 class="text-h4 text-md-h3 font-weight-regular">Podcast Dusun</h1>

          <v-card
            flat
            color="rgb(0, 0, 0, 0.01)"
            :width="responsiveImgHeight"
            class="text-caption text-sm-subtitle-1 pl-1 mb-4"
          >
            <ol>
              <li>
                Branding produk desa dengan warga sebagai narasumber dan
                dipromosikan ke khalayak luas
              </li>
              <li>
                Menjadi tempat untuk berkeluh kesah tentang permasalahan
                yang muncul baik itu dari pihak desa maupun mahasiswa
              </li>
              <li>
                Menjadi tempat untuk pembelajaran pagi warga dusun saren
                supaya lebih mengenal tentang platform online yang dapat
                digunakan untuk berkreasi
              </li>
            </ol>
          </v-card>

          <v-btn color="success" class="ml-2" depressed :href="urlSpotify.url" target="_blank">
            Dengar di Spotify
            <v-icon size="20px" class="ml-2">mdi-spotify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import { db } from "@/fb";

export default {
  name: "BannerPodcast",
  firestore() {
    return {
      urlSpotify: db.collection("podcast").doc("spotify")
    };
  },
  data() {
    return {
      urlSpotify: null,
    }
  },
  computed: {
    responsiveImgHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "240px";
        case "sm":
          return "400px";
        case "md":
          return "500px";
        case "lg":
          return "550px";
        case "xl":
          return "600px";
        default:
          return "400px";
      }
    }
  }
};
</script>
