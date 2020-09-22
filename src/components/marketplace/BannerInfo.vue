<template>
  <v-card flat tile dark width="100%" class="my-3">
    <v-img
      :src="require('@/assets/marketplace.jpeg')"
      class="grey lighten-2"
      height="400"
      width="100%"
    >
      <v-row class="fill-height pa-3" align="center">
        <v-col class="wrap" cols="12" md="7" offset="1">
          <h1 class="text-h4 text-md-h3 font-weight-regular">Marketplace Dusun</h1>

          <v-card
            flat
            color="rgb(0, 0, 0, 0.01)"
            :width="responsiveImgHeight"
            class="text-caption text-sm-subtitle-1 pl-1 mb-4"
          >
            <ol>
              <li>
                Menjadi tempat untuk pembelajaran pagi warga dusun saren
                supaya lebih mengenal tentang platform pasar online atau
                Marketplace.
              </li>
              <li>
                Pada Era digital proses jual beli, promosi dan branding produk
                banyak dilakukan secara digital, harapannya fitur marketplace pada
                website ini dapat membantu proses tersebut.
              </li>
              <li>
                Produk di marketplace bisa menjangkau lebih banyak khalayak, 
                karena selama masih ada internet produk dapat diakses semua
                masyarakat umum.
              </li>
            </ol>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "BannerInfo",
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
