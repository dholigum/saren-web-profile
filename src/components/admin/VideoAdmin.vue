<template>
  <v-card flat color="#FAFAFA" :width="responsiveCardWidth" class="overflow-x-auto">
    <v-data-table :headers="headers" :items="videos" sort-by="title" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Admin Video</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" :width="responsiveDialogWidth">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Tambah Video</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ addOrEdit }} Video</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Judul Video"
                    v-model="video.title"
                    prepend-icon="mdi-pencil"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-textarea
                    label="Deskripsi Video"
                    v-model="video.description"
                    prepend-icon="mdi-format-float-left"
                    :rules="inputRules"
                  ></v-textarea>
                  <v-text-field
                    label="URL YouTube"
                    v-model="video.url"
                    prepend-icon="mdi-link-variant"
                    :rules="inputRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Kembali</v-btn>
                <v-btn color="blue darken-1" text @click="addOrEditVideo">{{ addOrEdit }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="onEditVideo(item)" class="px-1">mdi-pencil</v-icon>
        <v-icon small @click="deleteVideo(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>Belum ada video, silahkan tambahkan</template>
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
  name: "VideoAdmin",
  firestore() {
    return {
      videos: db.collection("videos")
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
      video: {
        title: null,
        description: null,
        url: null
      },
      headers: [
        {
          text: "Judul Video",
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
        { text: "URL Youtube", value: "url", width: "250px", sortable: false },
        {
          text: "Aksi",
          align: "center",
          value: "actions",
          width: "100px",
          sortable: false
        }
      ],
      videos: []
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
    addNewVideo() {
      this.$refs.form.validate();
      if (
        this.video.title !== null &&
        this.video.description !== null &&
        this.video.url !== null
      ) {
        this.$confirm("Yakin data sudah sesuai?", {
          color: "warning",
          title: "Peringatan"
        }).then(res => {
          this.textSnackbar = "Data Video berhasil ditambahkan";
          if (res) {
            this.$firestore.videos
              .add({
                title: this.video.title,
                description: this.video.description,
                url: this.video.url
              })
              .finally(() => {
                this.snackbar = true;
                this.close();
              });
          }
        });
      }
    },
    onEditVideo(item) {
      this.flag = "edit";
      this.dialog = true;
      this.activeItemKey = item[".key"];
      this.video.title = item["title"];
      this.video.description = item["description"];
      this.video.url = item["url"];
    },
    editExistingVideo() {
      this.$firestore.videos
        .doc(this.activeItemKey)
        .update(this.video)
        .then(() => {
          this.snackbar = true;
          this.textSnackbar = "Data video berhasil diubah";
          this.close();
        });
    },
    addOrEditVideo() {
      if (this.flag === "add") {
        this.addNewVideo();
      } else {
        this.editExistingVideo();
      }
    },
    deleteVideo(item) {
      this.$confirm("Yakin ingin menghapus data?", {
        color: "warning",
        title: "Peringatan"
      }).then(res => {
        this.textSnackbar = "Data video berhasil dihapus";
        if (res) {
          this.$firestore.videos.doc(item[".key"]).delete();
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