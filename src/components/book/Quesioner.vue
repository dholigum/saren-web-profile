<template>
  <v-container fluid class="pa-0 mt-4">
    <v-row class="text-center">
      <template v-for="(quesioner, index) in paginatedQuesioner">
        <v-col class="my-3" :key="index">
          <v-card class="mx-auto" :width="responsiveCardWidth">
            <v-img
              contain
              class="white--text align-end"
              :height="responsiveImgHeight"
              :src="quesioner.coverUrl"
            ></v-img>

            <v-card-subtitle
              class="pb-0 text-center black--text text-h6 font-weight-bold"
            >{{ quesioner.title }}</v-card-subtitle>

            <v-card-text class="text--primary pt-2">
              <div>{{ quesioner.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text target="_blank" :href="quesioner.fillUrl">Isi Kuesioner</v-btn>
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
  name: "Quesioner",
  firestore() {
    return {
      quesioners: db.collection("quesioners")
    };
  },
  data() {
    return {
      pagination: {
        page: 1,
        perPage: 3
      },
      quesioners: []
    };
  },
  computed: {
    paginatedQuesioner() {
      return this.quesioners.slice(
        (this.pagination.page - 1) * this.pagination.perPage,
        this.pagination.page * this.pagination.perPage
      );
    },
    paginationLength() {
      return Math.ceil(this.quesioners.length / this.pagination.perPage);
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
          return "220px";
        case "lg":
          return "250px";
        case "xl":
          return "280px";
        default:
          return "200px";
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
