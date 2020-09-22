<template>
  <v-card flat color="#FAFAFA" :width="responsiveCardWidth" class="overflow-x-auto">
    <v-data-table :headers="headers" :items="podcasts" sort-by="title" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Admin Podcast</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" :width="responsiveDialogWidth">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Tambah Podcast</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ addOrEdit }} Podcast</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Judul Podcast"
                    v-model="podcast.title"
                    prepend-icon="mdi-pencil"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-textarea
                    label="Deskripsi Podcast"
                    v-model="podcast.description"
                    prepend-icon="mdi-format-float-left"
                    :rules="inputRules"
                  ></v-textarea>
                  <v-text-field
                    label="URL Cover"
                    v-model="podcast.coverUrl"
                    prepend-icon="mdi-file-image"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="URL Audio"
                    v-model="podcast.audioUrl"
                    prepend-icon="mdi-file-music"
                    :rules="inputRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Kembali</v-btn>
                <v-btn color="blue darken-1" text @click="addOrEditPodcast">{{ addOrEdit }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="onEditPodcast(item)" class="px-1">mdi-pencil</v-icon>
        <v-icon small @click="deletePodcast(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>Belum ada podcast, silahkan tambahkan</template>
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
  name: "PodcastAdmin",
  firestore() {
    return {
      podcasts: db.collection("podcasts")
    };
  },
  data() {
    return {
      dialog: false,
      dialogUrlSpotify: false,
      snackbar: false,
      textSnackbar: "",
      flag: "add",
      activeItemKey: "",
      inputRules: [v => !!v || "Mohon lengkapi field ini"],
      podcast: {
        title: null,
        description: null,
        coverUrl: null,
        audioUrl: null
      },
      headers: [
        {
          text: "Judul Podcast",
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
        {
          text: "URL Cover",
          value: "coverUrl",
          width: "250px",
          sortable: false
        },
        {
          text: "URL Audio",
          value: "audioUrl",
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
      podcasts: []
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
    },
  },
  methods: {
    addNewPodcast() {
      this.$refs.form.validate();
      if (
        this.podcast.title !== null &&
        this.podcast.description !== null &&
        this.podcast.coverUrl !== null &&
        this.podcast.audioUrl !== null
      ) {
        this.$confirm("Yakin data sudah sesuai?", {
          color: "warning",
          title: "Peringatan"
        }).then(res => {
          this.textSnackbar = "Data podcast berhasil ditambahkan";
          if (res) {
            this.$firestore.podcasts
              .add({
                title: this.podcast.title,
                description: this.podcast.description,
                coverUrl: this.podcast.coverUrl,
                audioUrl: this.podcast.audioUrl
              })
              .finally(() => {
                this.snackbar = true;
                this.close();
              });
          }
        });
      }
    },
    onEditPodcast(item) {
      this.flag = "edit";
      this.dialog = true;
      this.activeItemKey = item[".key"];
      this.podcast.title = item["title"];
      this.podcast.description = item["description"];
      this.podcast.coverUrl = item["coverUrl"];
      this.podcast.audioUrl = item["audioUrl"];
    },
    editExistingPodcast() {
      this.$firestore.podcasts
        .doc(this.activeItemKey)
        .update(this.podcast)
        .then(() => {
          this.snackbar = true;
          this.textSnackbar = "Data podcast berhasil diubah";
          this.close();
        });
    },
    addOrEditPodcast() {
      if (this.flag === "add") {
        this.addNewPodcast();
      } else {
        this.editExistingPodcast();
      }
    },
    deletePodcast(item) {
      this.$confirm("Yakin ingin menghapus data?", {
        color: "warning",
        title: "Peringatan"
      }).then(res => {
        this.textSnackbar = "Data podcast berhasil dihapus";
        if (res) {
          this.$firestore.podcasts.doc(item[".key"]).delete();
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