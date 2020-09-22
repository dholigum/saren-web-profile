<template>
  <v-card flat color="#FAFAFA" :width="responsiveCardWidth" class="overflow-x-auto">
    <v-data-table :headers="headers" :items="posters" sort-by="title" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Admin Poster</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" :width="responsiveDialogWidth">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Tambah Poster</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ addOrEdit }} Poster</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Judul Poster"
                    v-model="poster.title"
                    prepend-icon="mdi-pencil"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-textarea
                    label="Deskripsi Poster"
                    v-model="poster.description"
                    prepend-icon="mdi-format-float-left"
                    :rules="inputRules"
                  ></v-textarea>
                  <v-text-field
                    label="URL Preview Poster"
                    v-model="poster.url"
                    prepend-icon="mdi-link-variant"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="URL Lihat Detail Poster"
                    v-model="poster.viewLink"
                    prepend-icon="mdi-file-image"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="URL Bagikan Poster ke Facebook"
                    v-model="poster.shareLink"
                    prepend-icon="mdi-share"
                    :rules="inputRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Kembali</v-btn>
                <v-btn color="blue darken-1" text @click="addOrEditPoster">{{ addOrEdit }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="onEditPoster(item)" class="px-1">mdi-pencil</v-icon>
        <v-icon small @click="deletePoster(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>Belum ada poster, silahkan tambahkan</template>
    </v-data-table>
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
  name: "PosterAdmin",
  firestore() {
    return {
      posters: db.collection("posters")
    };
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      textSnackbar: "",
      flag: "add",
      activeItemKey: "",
      inputRules: [v => !!v || "Mohon lengkapi field ini"],
      poster: {
        title: null,
        description: null,
        url: null,
        viewLink: null,
        shareLink: null
      },
      headers: [
        {
          text: "Judul Poster",
          align: "start",
          value: "title",
          width: "300px"
        },
        {
          text: "Deskripsi",
          value: "description",
          width: "300px",
          sortable: false
        },
        { text: "URL Preview", value: "url", width: "250px", sortable: false },
        {
          text: "URL Lihat Detail",
          value: "viewLink",
          width: "250px",
          sortable: false
        },
        {
          text: "URL Bagikan",
          value: "shareLink",
          width: "250px",
          sortable: false
        },
        {
          text: "Aksi",
          align: "center",
          value: "actions",
          width: "100px",
          sortable: false
        }
      ],
      posters: []
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
    addOrEdit() {
      return this.flag === "add" ? "Tambah" : "Edit";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    addNewPoster() {
      this.$refs.form.validate();
      if (
        this.poster.title !== null &&
        this.poster.description !== null &&
        this.poster.url !== null &&
        this.poster.viewLink !== null &&
        this.poster.shareLink !== null
      ) {
        this.$confirm("Yakin data sudah sesuai?", {
          color: "warning",
          title: "Peringatan"
        }).then(res => {
          this.textSnackbar = "Data poster berhasil ditambahkan";
          if (res) {
            this.$firestore.posters
              .add({
                title: this.poster.title,
                description: this.poster.description,
                url: this.poster.url,
                viewLink: this.poster.viewLink,
                shareLink: this.poster.shareLink
              })
              .finally(() => {
                this.snackbar = true;
                this.close();
              });
          }
        });
      }
    },
    onEditPoster(item) {
      this.flag = "edit";
      this.dialog = true;
      this.activeItemKey = item[".key"];
      this.poster.title = item["title"];
      this.poster.description = item["description"];
      this.poster.url = item["url"];
      this.poster.viewLink = item["viewLink"];
      this.poster.shareLink = item["shareLink"];
    },
    editExistingPoster() {
      this.$firestore.posters
        .doc(this.activeItemKey)
        .update(this.poster)
        .then(() => {
          this.snackbar = true;
          this.textSnackbar = "Data poster berhasil diubah";
          this.close();
        });
    },
    addOrEditPoster() {
      if (this.flag === "add") {
        this.addNewPoster();
      } else {
        this.editExistingPoster();
      }
    },
    deletePoster(item) {
      this.$confirm("Yakin ingin menghapus data?", {
        color: "warning",
        title: "Peringatan"
      }).then(res => {
        this.textSnackbar = "Data poster berhasil dihapus";
        if (res) {
          this.$firestore.posters.doc(item[".key"]).delete();
          this.snackbar = true;
        }
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