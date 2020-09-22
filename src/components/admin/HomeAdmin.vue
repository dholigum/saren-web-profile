<template>
  <v-card flat color="#FAFAFA" :width="responsiveCardWidth" class="overflow-x-auto">
    <v-toolbar flat color="white">
      <v-toolbar-title>Admin Profil dan Potensi</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" :width="responsiveDialogWidth">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            @click="onEditData"
          >Edit Data</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Profil dan Potensi</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-textarea
                rows="3"
                label="Deskripsi Profil"
                v-model="editedData.profile"
                prepend-icon="mdi-format-float-left"
                :rules="inputRules"
              ></v-textarea>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Jumlah RT"
                    v-model="editedData.statisticRT"
                    prepend-icon="mdi-account-multiple"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Jumlah RW"
                    v-model="editedData.statisticRW"
                    prepend-icon="mdi-account-multiple"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Jumlah KK"
                    v-model="editedData.statisticKK"
                    prepend-icon="mdi-account-multiple"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-textarea
                rows="3"
                label="Deskripsi Potensi"
                v-model="editedData.potential"
                prepend-icon="mdi-trophy"
                :rules="inputRules"
              ></v-textarea>
              <v-text-field
                label="URL Peta Potensi"
                v-model="editedData.mapUrl"
                prepend-icon="mdi-map"
                :rules="inputRules"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Kembali</v-btn>
            <v-btn color="blue darken-1" text @click="editData">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-toolbar flat :height="responsiveHeight" class="pt-5 overflow-y-auto">
      <v-container>
        <v-row>
          <v-col cols="3">Deskripsi Profile :</v-col>
          <v-col cols="9">{{ data[0].profile }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="3">Statistik :</v-col>
          <v-col
            cols="9"
          >{{ data[0].statisticRT }} RT, {{ data[0].statisticRW }} RW, {{ data[0].statisticKK }} KK</v-col>
        </v-row>
        <v-row>
          <v-col cols="3">Deskripsi Potensi :</v-col>
          <v-col cols="9">{{ data[0].potential }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="3">URL Peta Potensi :</v-col>
          <v-col cols="9">{{ data[0].mapUrl }}</v-col>
        </v-row>
      </v-container>
    </v-toolbar>

    <v-snackbar v-model="snackbar" :top="true" class="mt-5">
      {{ textSnackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Tutup</v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { db } from "@/fb";

export default {
  name: "HomeAdmin",
  firestore() {
    return {
      data: db.collection("home")
    };
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      textSnackbar: "",
      inputRules: [v => !!v || "Mohon lengkapi field ini"],
      editedData: {
        profile: null,
        statisticRT: null,
        statisticRW: null,
        statisticKK: null,
        potential: null,
        mapUrl: null
      },
      data: null,
      activeItemKey: null
    };
  },
  computed: {
    responsiveCardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "500px";
        case "sm":
          return "700px";
        case "md":
          return "900px";
        case "lg":
          return "1200px";
        case "xl":
          return "1400px";
        default:
          return "300px";
      }
    },
    responsiveDialogWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "400px";
        case "sm":
          return "700px";
        case "md":
          return "800px";
        case "lg":
          return "900px";
        case "xl":
          return "1000px";
        default:
          return "300px";
      }
    },
    responsiveHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "500px";
        case "sm":
          return "400px";
        case "md":
          return "330px";
        case "lg":
          return "330px";
        case "xl":
          return "330px";
        default:
          return "330px";
      }
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    data() {
      this.editedData.profile = this.data[0].profile;
      this.editedData.statisticRT = this.data[0].statisticRT;
      this.editedData.statisticRW = this.data[0].statisticRW;
      this.editedData.statisticKK = this.data[0].statisticKK;
      this.editedData.potential = this.data[0].potential;
      this.editedData.mapUrl = this.data[0].mapUrl;
    }
  },
  methods: {
    editData() {
      this.$firestore.data
        .doc("content")
        .update(this.editedData)
        .then(() => {
          this.snackbar = true;
          this.textSnackbar = "Data profile dan potensi berhasil diubah";
          this.close();
        });
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>