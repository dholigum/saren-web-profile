<template>
  <v-card flat tile dark width="100%">
    <v-img
      :src="require('@/assets/rsz_bali-ricefield-1.jpg')"
      class="grey lighten-2"
      height="400"
      width="100%"
    >
      <v-row class="fill-height pa-3" align="center" justify="end">
        <v-col class="wrap" cols="12" md="10" sm="10" offset="1">
          <h1 class="text-end text-h4 text-md-h3 font-weight-regular pr-5">Potensi Dusun</h1>

          <v-card
            flat
            color="rgb(0, 0, 0, 0.01)"
            class="text-end text-caption text-sm-subtitle-1 ma-0 mb-4 pr-5"
          >{{ data[0].potential }}</v-card>

          <v-row justify="end" class="mr-5">
            <v-btn color="primary" depressed target="_blank" :href="data[0].mapUrl">Lihat Peta Dusun</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import { db } from "@/fb";

export default {
  name: "BannerPotential",
  firestore() {
    return {
      data: db.collection("home")
    };
  },
  data() {
    return {
      data: null
    };
  },
  computed: {}
};
</script>
