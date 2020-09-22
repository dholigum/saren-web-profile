<template>
  <v-card
    flat
    wrap
    color="#FAFAFA"
    :width="responsiveCardWidth"
    :height="responsiveImgHeight"
    class="text-caption text-sm-subtitle-1 text-center px-3 px-md-5 my-3 py-5"
  >
    <v-row justify="center" class="text-h6 text-sm-h5 my-2 mb-5">Dusun Saren dalam Angka</v-row>
    <v-row justify="center" align="center" class="pt-5">
      <v-col>
        <number
          class="text-h2 text-sm-h1 pr-1"
          ref="numberRt"
          :from="0"
          :to="data[0].statisticRT"
          :duration="3"
          :delay="1"
          easing="Power1.easeOut"
          @mouseenter="restartAnimation"
        />RT
      </v-col>
      <v-col>
        <number
          class="text-h2 text-sm-h1 pr-1"
          ref="numberRw"
          :from="0"
          :to="data[0].statisticRW"
          :duration="3"
          :delay="1"
          easing="Power1.easeOut"
          @mouseenter="restartAnimation"
        />RW
      </v-col>
      <v-col>
        <number
          class="text-h2 text-sm-h1 pr-1"
          ref="numberKk"
          :from="0"
          :to="data[0].statisticKK"
          :duration="3"
          :delay="1"
          easing="Power1.easeOut"
          @mouseenter="restartAnimation"
        />KK
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { db } from "@/fb";

export default {
  name: "InNumber",
  firestore() {
    return {
      data: db.collection("home")
    };
  },
  data() {
    return {
      mouseActive: false,
      data: null,
    };
  },
  computed: {
    responsiveCardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "350px";
        case "sm":
          return "500px";
        case "md":
          return "700px";
        case "lg":
          return "750px";
        case "xl":
          return "800px";
        default:
          return "300px";
      }
    },
    responsiveImgHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "200px";
        case "sm":
          return "250px";
        case "md":
          return "300px";
        case "lg":
          return "300px";
        case "xl":
          return "350px";
        default:
          return "200px";
      }
    }
  },
  methods: {
    restartAnimation() {
      this.mouseActive = !this.mouseActive;
      this.$refs.numberRt.restart();
      this.$refs.numberRw.restart();
      this.$refs.numberKk.restart();
    }
  }
};
</script>

<style scoped>
</style>
