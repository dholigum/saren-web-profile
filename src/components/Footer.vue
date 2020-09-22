<template>
  <v-footer dark padless>
    <v-container fluid class="pa-0">
      <v-card flat tile class="indigo lighten-1 white--text text-center" width="auto">
        <v-card-text>
          Media Dusun lainnya:
          <v-btn v-for="media in otherMedia" :key="media.url" target="_blank" :href="media.url" class="ml-3 white--text" icon>
            <v-icon size="24px">{{ media.icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0 pr-3 mx-auto">
          “Beri aku 1.000 orang tua, niscaya akan kucabut semeru dari akarnya.
          Beri aku 10 pemuda niscaya akan kuguncangkan dunia.”
          <br />- Ir. Soekarno
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          2020 —
          <strong>TIM KKN PPM UGM Sumberrahayu Sub-Unit Dusun Saren</strong>
        </v-card-text>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-instagram"],
    otherMedia: [
      {
        url: "https://m.facebook.com/dusunsaren.sumberrahayu.7",
        icon: "mdi-facebook"
      },
      {
        url:
          "https://www.instagram.com/dusunsaren_sumberrahayu/",
        icon: "mdi-instagram"
      }
    ]
  })
};
</script>
