<template>
  <v-card flat color="#FAFAFA" :width="responsiveCardWidth" class="overflow-x-auto">
    <v-data-table :headers="headers" :items="ebooks" sort-by="title" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Admin Ebook</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" :width="responsiveDialogWidth">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Tambah Ebook</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ addOrEdit }} Ebook</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Judul Ebook"
                    v-model="ebook.title"
                    prepend-icon="mdi-pencil"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-textarea
                    label="Deskripsi Ebook"
                    rows="3"
                    v-model="ebook.description"
                    prepend-icon="mdi-format-float-left"
                    :rules="inputRules"
                  ></v-textarea>
                  <v-text-field
                    label="URL Cover Ebook"
                    v-model="ebook.coverUrl"
                    prepend-icon="mdi-file-image"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="URL Lihat PDF"
                    v-model="ebook.viewUrl"
                    prepend-icon="mdi-file-pdf"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="URL Download Ebook"
                    v-model="ebook.downloadUrl"
                    prepend-icon="mdi-download"
                    :rules="inputRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Kembali</v-btn>
                <v-btn color="blue darken-1" text @click="addOrEditEbook">{{ addOrEdit }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="onEditEbook(item)" class="px-1">mdi-pencil</v-icon>
        <v-icon small @click="deleteEbook(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>Belum ada ebook, silahkan tambahkan</template>
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
  name: "EbookAdmin",
  firestore() {
    return {
      ebooks: db.collection("ebooks")
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
      ebook: {
        title: null,
        description: null,
        coverUrl: null,
        viewUrl: null,
        downloadUrl: null
      },
      headers: [
        {
          text: "Judul Ebook",
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
          text: "URL Lihat PDF",
          value: "viewUrl",
          width: "250px",
          sortable: false
        },
        {
          text: "URL Download",
          value: "downloadUrl",
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
      ebooks: []
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
    addNewEbook() {
      this.$refs.form.validate();
      if (
        this.ebook.title !== null &&
        this.ebook.description !== null &&
        this.ebook.coverUrl !== null &&
        this.ebook.viewUrl !== null &&
        this.ebook.downloadUrl !== null
      ) {
        this.$confirm("Yakin data sudah sesuai?", {
          color: "warning",
          title: "Peringatan"
        }).then(res => {
          this.textSnackbar = "Data ebook berhasil ditambahkan";
          if (res) {
            this.$firestore.ebooks
              .add({
                title: this.ebook.title,
                description: this.ebook.description,
                coverUrl: this.ebook.coverUrl,
                viewUrl: this.ebook.viewUrl,
                downloadUrl: this.ebook.downloadUrl
              })
              .finally(() => {
                this.snackbar = true;
                this.close();
              });
          }
        });
      }
    },
    onEditEbook(item) {
      this.flag = "edit";
      this.dialog = true;
      this.activeItemKey = item[".key"];
      this.ebook.title = item["title"];
      this.ebook.description = item["description"];
      this.ebook.coverUrl = item["coverUrl"];
      this.ebook.viewUrl = item["viewUrl"];
      this.ebook.downloadUrl = item["downloadUrl"];
    },
    editExistingEbook() {
      this.$firestore.ebooks
        .doc(this.activeItemKey)
        .update(this.ebook)
        .then(() => {
          this.snackbar = true;
          this.textSnackbar = "Data ebook berhasil diubah";
          this.close();
        });
    },
    addOrEditEbook() {
      if (this.flag === "add") {
        this.addNewEbook();
      } else {
        this.editExistingEbook();
      }
    },
    deleteEbook(item) {
      this.$confirm("Yakin ingin menghapus data?", {
        color: "warning",
        title: "Peringatan"
      }).then(res => {
        this.textSnackbar = "Data ebook berhasil dihapus";
        if (res) {
          this.$firestore.ebooks.doc(item[".key"]).delete();
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