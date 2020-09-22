<template>
  <v-card flat tile dark width="100%" class="my-3">
    <v-img
      :src="require('@/assets/ricefield-ubud.jpeg')"
      class="grey lighten-2"
      height="400"
      width="100%"
    >
      <v-row class="fill-height pa-3" align="center">
        <v-col class="wrap" cols="12" md="7" offset="1">
          <h1 class="text-h4 text-md-h3 font-weight-regular">Dusun Saren</h1>

          <v-card
            flat
            color="rgb(0, 0, 0, 0.01)"
            :width="responsiveImgHeight"
            class="text-caption text-sm-subtitle-1 pl-1 mb-4"
          >{{ data[0].profile }}</v-card>

          <!-- <v-btn color="primary" depressed>Subscribe</v-btn> -->
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import { db } from "@/fb";

export default {
  name: "BannerProfile",
  firestore() {
    return {
      data: db.collection("home")
    };
  },
  data() {
    return {
      data: null,
    };
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
