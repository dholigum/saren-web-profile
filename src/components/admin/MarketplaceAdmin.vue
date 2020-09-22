<template>
  <v-card flat color="#FAFAFA" :width="responsiveCardWidth" class="overflow-x-auto">
    <v-data-table :headers="headers" :items="products" sort-by="title" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Admin Marketplace</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" :width="responsiveDialogWidth">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Tambah Produk</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ addOrEdit }} Produk</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Judul Produk"
                    v-model="product.title"
                    prepend-icon="mdi-pencil"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-textarea
                    label="Deskripsi Produk"
                    v-model="product.description"
                    prepend-icon="mdi-format-float-left"
                    rows="3"
                    :rules="inputRules"
                  ></v-textarea>
                  <v-text-field
                    label="Harga Produk"
                    type="number"
                    min="0"
                    v-model="product.price"
                    prepend-icon="mdi-currency-usd"
                    :rules="inputRules"
                  ></v-text-field>
                  <v-text-field
                    label="No. Telp Penjual"
                    prefix="+62"
                    v-model="product.phone_no"
                    prepend-icon="mdi-phone"
                    :rules="inputRules"
                  ></v-text-field>
                  <template v-for="(item, index) in product.images">
                    <v-file-input
                      show-size
                      :key="index"
                      :rules="uploadRules"
                      accept="image/png, image/jpeg, image/bmp"
                      counter
                      v-model="product.images[index]"
                      label="Gambar Produk"
                      @change="onFilePicked(index)"
                    ></v-file-input>
                    <v-btn
                      class="ml-5"
                      color="blue darken-1"
                      :key="index"
                      :disabled="isUploaded[index]"
                      text
                      @click="onUpload(index)"
                    >Upload Gambar</v-btn>
                    <v-btn
                      v-if="index === 0"
                      color="blue darken-1"
                      :key="index"
                      text
                      @click="onActionButton('add')"
                    >Tambahkan Gambar</v-btn>
                    <!-- <v-btn
                      v-if="product.images.length > 1"
                      color="blue darken-1"
                      :key="index"
                      text
                      @click="onActionButton('delete', index)"
                    >Hapus Gambar</v-btn> -->
                    <v-alert
                      :key="index"
                      v-if="textSnackbar === `File Gambar ${index + 1} berhasil di-upload`"
                      type="success"
                    >Gambar sudah di-upload.</v-alert>
                  </template>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Kembali</v-btn>
                <v-btn color="blue darken-1" text @click="addOrEditProduct">{{ addOrEdit }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.images="{ item }">
        <v-card flat width="500px">
          <v-row>
            <template v-for="(imageUrl, index) in item.images">
              <v-col cols="4" :key="index" class="mx-2">
                <img :src="imageUrl" width="200" height="200" />
              </v-col>
            </template>
          </v-row>
        </v-card>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteProduct(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>Belum ada produk, silahkan tambahkan</template>
    </v-data-table>
    <img :src="imageUrl" height="150" />
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
import { firebase } from "@firebase/app";

export default {
  name: "MarketplaceAdmin",
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      textSnackbar: "",
      flag: "add",
      activeItemKey: "",
      imageUrl: [],
      isUploaded: [false],
      inputRules: [v => !!v || "Mohon lengkapi field ini"],
      uploadRules: [
        value =>
          !value || value.size < 1000000 || "Total ukuran gambar maks 1 MB!"
      ],
      product: {
        title: null,
        description: null,
        price: null,
        phone_no: null,
        images: [""],
        imageData: []
      },
      headers: [
        {
          text: "Judul Produk",
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
          text: "Harga",
          value: "price",
          width: "150px",
          sortable: false
        },
        {
          text: "No. Telp Penjual",
          value: "phone_no",
          width: "150px",
          sortable: false
        },
        {
          text: "Gambar Produk",
          value: "images",
          width: "300px",
          sortable: false
        },
        {
          text: "Aksi",
          value: "actions",
          width: "100px",
          sortable: false
        }
      ],
      products: []
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
    },
    phoneNumber() {
      if (this.product.phone_no !== null) {
        return `+62${this.product.phone_no}`;
      }
      return "";
    },
    isImagesMoreThanOne() {
      return this.product.images.length > 1;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    "product.image": function(val) {
      if (val === "" || val === undefined) {
        this.imageUrl = "";
      }
    }
  },
  methods: {
    onActionButton(action, index) {
      if (action === "add") {
        if (this.product.images.length < 3) {
          this.product.images.push("");
          this.isUploaded.push(false);
        } else {
          this.snackbar = true;
          this.textSnackbar = 'Maksimal 3 Gambar Produk'
        }
      } else {
        this.product.images.splice(index, 1);
        this.isUploaded.splice(index, 1);
      }
    },
    addNewProduct() {
      this.$refs.form.validate();
      if (
        this.product.title !== null &&
        this.product.description !== null &&
        this.product.price !== null &&
        this.product.phone_no !== null &&
        this.product.image !== null &&
        this.product.imageData !== null
      ) {
        this.$confirm("Yakin data sudah sesuai?", {
          color: "warning",
          title: "Peringatan"
        }).then(res => {
          this.textSnackbar = "Data produk berhasil ditambahkan";
          if (res) {
            this.$firestore.products
              .add({
                title: this.product.title,
                description: this.product.description,
                price: this.product.price,
                phone_no: this.phoneNumber,
                images: this.product.imageData
              })
              .finally(() => {
                this.snackbar = true;
                this.close();
              });
          }
        });
      }
    },
    onEditProduct(item) {
      this.flag = "edit";
      this.dialog = true;
      this.activeItemKey = item[".key"];
      this.product.title = item["title"];
      this.product.description = item["description"];
      this.product.price = item["price"];
      this.product.phone_no = item["phone_no"];
    },
    onFilePicked(index) {
      const file = this.product.images[index];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl[index] = fileReader.result;
      });
      fileReader.readAsDataURL(file);
    },
    onUpload(index) {
      this.isUploaded[index] = true;
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child(`${this.product.title}/${this.product.images[index].name}`)
        .putString(this.imageUrl[index], "data_url");

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          this.textSnackbar = `File Gambar ${index + 1} berhasil di-upload`;
          this.snackbar = true;
          this.isUploaded[index] = true;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        error => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(() => {
            console.log("DONE image upload to Firebase");
          });
        }
      );
    },
    downloadImage() {
      var storageRef = firebase.storage().ref();
      const imageFromFirebase = [];
      // Now we get the references of these images
      storageRef
        .child(`${this.product.title}/`)
        .listAll()
        .then(result => {
          result.items.forEach((imageRef, index) => {
            imageRef.getDownloadURL().then(url => {
              imageFromFirebase[index] = url.toString();
              this.product.imageData = imageFromFirebase;
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editExistingProduct() {
      this.$firestore.products
        .doc(this.activeItemKey)
        .update(this.product)
        .then(() => {
          this.snackbar = true;
          this.textSnackbar = "Data produk berhasil diubah";
          this.close();
        });
    },
    addOrEditProduct() {
      if (this.flag === "add") {
        this.downloadImage();
        this.addNewProduct();
      } else {
        this.editExistingProduct();
      }
    },
    deleteProduct(item) {
      this.$confirm("Yakin ingin menghapus data?", {
        color: "warning",
        title: "Peringatan"
      }).then(res => {
        this.textSnackbar = "Data produk berhasil dihapus";
        if (res) {
          this.$firestore.products.doc(item[".key"]).delete();
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
img {
  display: block;
  max-width: 150px;
  max-height: 150px;
  width: auto;
  height: auto;
}
</style>