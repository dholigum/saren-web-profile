<template>
  <v-container fluid class="pa-0 mt-4">
    <v-row class="text-center">
      <template v-for="(ebook, index) in paginatedEbook">
        <v-col class="my-3" :key="index">
          <v-card class="mx-auto" :width="responsiveCardWidth">
            <v-img
              contain
              class="white--text align-end"
              :height="responsiveImgHeight"
              :src="ebook.coverUrl"
            ></v-img>

            <v-card-subtitle
              class="pb-0 text-center black--text text-h6 font-weight-bold"
            >{{ ebook.title }}</v-card-subtitle>

            <v-card-text class="text--primary pt-2">
              <div>{{ ebook.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text target="_blank" :href="ebook.viewUrl">Lihat</v-btn>
              <v-btn color="orange" text target="_blank" :href="ebook.downloadUrl">Unduh</v-btn>
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
  name: "Ebook",
  firestore() {
    return {
      ebooks: db.collection("ebooks")
    };
  },
  data() {
    return {
      pagination: {
        page: 1,
        perPage: 3
      },
      ebooks: []
    };
  },
  computed: {
    paginatedEbook() {
      return this.ebooks.slice(
        (this.pagination.page - 1) * this.pagination.perPage,
        this.pagination.page * this.pagination.perPage
      );
    },
    paginationLength() {
      return Math.ceil(this.ebooks.length / this.pagination.perPage);
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
          return "180px";
        case "sm":
          return "200px";
        case "md":
          return "250px";
        case "lg":
          return "300px";
        case "xl":
          return "350px";
        default:
          return "300px";
      }
    }
  },
  watch: {
    "$vuetify.breakpoint.name": function(val) {
      if (val === "md" || val === "sm" || val === "xs") {
        this.pagination.perPage = 2;
      } else {
        this.pagination.perPage = 3;
      }
    }
  },
  methods: {}
};
</script>
