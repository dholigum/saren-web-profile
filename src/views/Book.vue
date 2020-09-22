<template>
  <v-container fluid>
    <v-row class="mt-5" align="center" justify="center">
      <v-card flat wrap color="#FAFAFA" class="text-h6 text-sm-h4 mt-3">Buku Digital & Kuesioner</v-card>
    </v-row>
    <v-row class="mt-2" align="center" justify="center">
      <v-card
        flat
        wrap
        color="#FAFAFA"
        :width="responsiveCardWidth"
        class="text-caption text-sm-subtitle-1 text-center px-3 px-md-5 mt-3"
      >Kumpulan Buku Panduan Digital dan Kuesioner dari hasil kegiatan KKN-PPM. Produk digital baik buku panduan, buletin dapat diunduh dan disebarluaskan untuk kebermanfaatan bersama. Kuesioner dapat diisi sesuai dengan kebutuhan dan sebagai evaluasi program yang ada</v-card>
    </v-row>
    <Ebook />
    <Quesioner />
  </v-container>
</template>

<script>
import Ebook from "@/components/book/Ebook.vue";
import Quesioner from "@/components/book/Quesioner.vue";

export default {
  name: "Book",
  components: {
    Ebook,
    Quesioner
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