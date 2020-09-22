<template>
  <v-card flat color="#FAFAFA" :width="responsiveCardWidth" class="overflow-x-auto">
    <v-data-table :headers="headers" :items="quesioners" sort-by="title" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Admin Kuesioner</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" :width="responsiveDialogWidth">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Tambah Kuesioner</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ addOrEdit }} Kuesioner</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Judul Kuesioner"
                    v-model="quesioner.title"
                    prepend-icon="mdi-pencil"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-textarea
                    label="Deskripsi Kuesioner"
                    v-model="quesioner.description"
                    prepend-icon="mdi-format-float-left"
                    :rules="inputRules"
                  ></v-textarea>
                  <v-text-field
                    label="URL Cover"
                    v-model="quesioner.coverUrl"
                    prepend-icon="mdi-file-image"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="URL Isi Kuesioner"
                    v-model="quesioner.fillUrl"
                    prepend-icon="mdi-message-draw"
                    :rules="inputRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Kembali</v-btn>
                <v-btn color="blue darken-1" text @click="addOrEditQuesioner">{{ addOrEdit }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="onEditQuesioner(item)" class="px-1">mdi-pencil</v-icon>
        <v-icon small @click="deleteQuesioner(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>Belum ada kuesioner, silahkan tambahkan</template>
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
  name: "QuesionerAdmin",
  firestore() {
    return {
      quesioners: db.collection("quesioners")
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
      quesioner: {
        title: null,
        description: null,
        url: null,
        viewLink: null,
        shareLink: null
      },
      headers: [
        {
          text: "Judul Kuesioner",
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
          text: "URL Form",
          value: "fillUrl",
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
      quesioners: []
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
    addNewQuesioner() {
      this.$refs.form.validate();
      if (
        this.quesioner.title !== null &&
        this.quesioner.description !== null &&
        this.quesioner.coverUrl !== null &&
        this.quesioner.fillUrl !== null
      ) {
        this.$confirm("Yakin data sudah sesuai?", {
          color: "warning",
          title: "Peringatan"
        }).then(res => {
          this.textSnackbar = "Data kuesioner berhasil ditambahkan";
          if (res) {
            this.$firestore.quesioners
              .add({
                title: this.quesioner.title,
                description: this.quesioner.description,
                coverUrl: this.quesioner.coverUrl,
                fillUrl: this.quesioner.fillUrl
              })
              .finally(() => {
                this.snackbar = true;
                this.close();
              });
          }
        });
      }
    },
    onEditQuesioner(item) {
      this.flag = "edit";
      this.dialog = true;
      this.activeItemKey = item[".key"];
      this.quesioner.title = item["title"];
      this.quesioner.description = item["description"];
      this.quesioner.coverUrl = item["coverUrl"];
      this.quesioner.fillUrl = item["fillUrl"];
    },
    editExistingQuesioner() {
      this.$firestore.quesioners
        .doc(this.activeItemKey)
        .update(this.quesioner)
        .then(() => {
          this.snackbar = true;
          this.textSnackbar = "Data kuesioner berhasil diubah";
          this.close();
        });
    },
    addOrEditQuesioner() {
      if (this.flag === "add") {
        this.addNewQuesioner();
      } else {
        this.editExistingQuesioner();
      }
    },
    deleteQuesioner(item) {
      this.$confirm("Yakin ingin menghapus data?", {
        color: "warning",
        title: "Peringatan"
      }).then(res => {
        this.textSnackbar = "Data kuesioner berhasil dihapus";
        if (res) {
          this.$firestore.quesioners.doc(item[".key"]).delete();
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