<template>
  <v-container id="scroll-target" fluid>
    <v-row class="mt-5" align="center" justify="center">
      <v-card color="#FAFAFA" flat wrap class="text-h6 text-sm-h4 mt-3">Marketplace Dusun</v-card>
    </v-row>
    <v-row class="mt-2" align="center" justify="center">
      <v-card
        flat
        color="#FAFAFA"
        wrap
        :width="responsiveCardWidth"
        class="text-caption text-sm-subtitle-1 text-center px-3 px-md-5 mt-3"
      >Marketplace Dusun Saren, tempat promosi dan jual beli produk yang ditawarkan oleh masyarakat dusun Saren ke masyarakat umum</v-card>
    </v-row>
    <v-row class="mt-5">
      <BannerInfo />
    </v-row>
    <v-row class="mt-5" justify="center">
      <ProductList />
    </v-row>
  </v-container>
</template>

<script>
import BannerInfo from "@/components/marketplace/BannerInfo.vue";
import ProductList from "@/components/marketplace/ProductList.vue";

export default {
  name: "Marketplace",
  components: {
    BannerInfo,
    ProductList
  },
  data() {
    return {
      height: 0
    };
  },
  mounted() {},
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
  },
  methods: {}
};
</script>

<style scoped>
</style>
