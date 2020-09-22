<template>
  <v-container id="scroll-target" fluid>
    <v-row class="mt-5" align="center" justify="center">
      <v-card color="#FAFAFA" flat wrap class="text-h6 text-sm-h4 mt-3">Profil & Potensi</v-card>
    </v-row>
    <v-row class="mt-2" align="center" justify="center">
      <v-card
        flat
        color="#FAFAFA"
        wrap
        :width="responsiveCardWidth"
        class="text-caption text-sm-subtitle-1 text-center px-3 px-md-5 mt-3"
      >Dashboard menu berisi profil & potensi yang ada di Dusun Saren</v-card>
    </v-row>
    <v-row class="mt-5">
      <BannerProfile />
    </v-row>
    <v-row class="mt-5" justify="center">
      <InNumber />
    </v-row>
    <v-row class="mt-5">
      <BannerPotential />
    </v-row>
  </v-container>
</template>

<script>
import BannerProfile from "@/components/profile/BannerProfile.vue";
import InNumber from "@/components/profile/InNumber.vue";
import BannerPotential from "@/components/profile/BannerPotential.vue";

export default {
  name: "Home",
  components: {
    BannerProfile,
    InNumber,
    BannerPotential
  },
  data() {
    return {
      height: 0
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
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
