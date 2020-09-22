<template>
  <v-container fluid>
    <v-row class="mt-5" align="center" justify="center">
      <v-card flat wrap color="#FAFAFA" class="text-h6 text-sm-h4 mt-3">Galleri Foto & Video</v-card>
    </v-row>
    <v-row class="mt-2" align="center" justify="center">
      <v-card
        flat
        wrap
        color="#FAFAFA"
        :width="responsiveCardWidth"
        class="text-caption text-sm-subtitle-1 text-center px-3 px-md-5 mt-3"
      >Galeri informasi hasil kegiatan dalam bentuk foto & video. Baik foto poster maupun video edukasi dapat diunduh dan disebarluaskan untuk kebermanfaatan bersama</v-card>
    </v-row>
    <Posters />
    <Videos />
  </v-container>
</template>

<script>
import Posters from "@/components/gallery/Posters.vue";
import Videos from "@/components/gallery/Videos.vue";

export default {
  name: "Gallery",
  components: {
    Posters,
    Videos
  },
  data() {
    return {};
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
    }
  }
};
</script>