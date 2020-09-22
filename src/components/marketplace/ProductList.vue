<template>
  <v-container fluid class="pa-0 mt-4">
    <v-row class="text-center">
      <template v-for="(product, index) in paginatedProduct">
        <v-col class="my-3" :key="index">
          <v-card class="mx-auto" :width="responsiveCardWidth">
            <v-img contain class="white--text align-end" :height="responsiveImgHeight">
              <v-carousel>
                <v-carousel-item
                  v-for="(item,i) in product.images"
                  :key="i"
                  :src="item"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-img>

            <v-card-subtitle
              class="pb-0 text-center black--text text-h6 font-weight-bold"
            >{{ product.title }}</v-card-subtitle>

            <v-card-text class="text--primary pt-2">
              <div>{{ product.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange"
                text
                target="_blank"
                :href="sendWhatsappChat(product.phone_no, product.title)"
              >Hubungi Penjual</v-btn>
              <v-spacer></v-spacer>
              <v-card-subtitle
                class="text-right black--text text-h6"
              >Rp. {{ product.price.toLocaleString('id-ID') }}</v-card-subtitle>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <v-row justify="end" class="mr-3">
      <v-pagination :length="paginationLength" v-model="pagination.page"></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/fb";

export default {
  name: "ProductList",
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  data() {
    return {
      pagination: {
        page: 1,
        perPage: 6
      },
      products: []
    };
  },
  watch: {
    "$vuetify.breakpoint.name": function(val) {
      if (val === "md" || val === "sm" || val === "xs") {
        this.pagination.perPage = 4;
      } else {
        this.pagination.perPage = 6;
      }
    }
  },
  computed: {
    paginatedProduct() {
      return this.products.slice(
        (this.pagination.page - 1) * this.pagination.perPage,
        this.pagination.page * this.pagination.perPage
      );
    },
    paginationLength() {
      return Math.ceil(this.products.length / this.pagination.perPage);
    },
    responsiveCardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "280px";
        case "sm":
          return "350px";
        case "md":
          return "400px";
        case "lg":
          return "400px";
        case "xl":
          return "450px";
        default:
          return "300px";
      }
    },
    responsiveImgHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "280px";
        case "sm":
          return "350px";
        case "md":
          return "400px";
        case "lg":
          return "400px";
        case "xl":
          return "450px";
        default:
          return "300px";
      }
    }
  },
  methods: {
    onBeforePlay(next) {
      next();
    },
    sendWhatsappChat(phoneNumber, product) {
      const apiCall = "https://api.whatsapp.com/send?phone=";
      const textMessage = `Assalamuaialkum, Halo Bapak/Ibu saya tertarik dengan produk ${product}, Boleh tanya-tanya lebih lanjut? Terimakasih`;

      const apiWhatsappFull = apiCall
        .concat(phoneNumber)
        .concat("&text=")
        .concat(encodeURIComponent(textMessage.trim()));

      return apiWhatsappFull;
    }
  }
};
</script>
