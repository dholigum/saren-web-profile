<template>
  <v-container fluid class="my-5">
    <v-col class="my-5" cols="12">
      <v-row justify="center">
        <h1 class="text-h1 my-5">404</h1>
      </v-row>
      <v-row justify="center">
        <h1 class="text-h6">Maaf, Halaman Tidak Ditemukan</h1>
      </v-row>
      <v-row justify="center" class="mt-5">
        <v-btn color="indigo" class="white--text ma-3" to="/">
          Kembali ke Menu Utama
          <v-icon right dark>mdi-open-in-new</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ErrorPage",
  components: {
    // HelloWorld
  }
};
</script>