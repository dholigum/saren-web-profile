<template>
  <v-container fluid class="pa-0">
    <v-row class="text-center">
      <v-col cols="12"></v-col>

      <v-col class="mb-4">
        <v-card class="mx-auto" max-width="450">
          <v-img
            class="white--text align-end"
            height="650px"
            src="https://trello-attachments.s3.amazonaws.com/5f01c772ca77868efa43581a/5f028047b9d1d15cd433fd71/fb223f3f4ed395aa5e5386a0dcc3d5bf/Cuci_Tangan_Pakai_Sabun_(CTPS).jpg"
          ></v-img>

          <v-card-subtitle
            class="pb-0 text-center black--text text-h6 font-weight-bold"
          >Poster Cuci Tangan Pakai Sabun (CTPS)</v-card-subtitle>

          <v-card-text class="text--primary pt-2">
            <div>Cuci Tangan Pakai Sabun (CTPS) dengan air mengalir sangat penting untuk menjaga diri dari COVID-19</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="mb-4">
        <v-card class="mx-auto" max-width="450">
          <v-img
            class="white--text align-end"
            height="650px"
            src="https://trello-attachments.s3.amazonaws.com/5f01c772ca77868efa43581a/5f028047b9d1d15cd433fd71/fb223f3f4ed395aa5e5386a0dcc3d5bf/Cuci_Tangan_Pakai_Sabun_(CTPS).jpg"
          ></v-img>

          <v-card-subtitle
            class="pb-0 text-center black--text text-h6 font-weight-bold"
          >Poster Cuci Tangan Pakai Sabun (CTPS)</v-card-subtitle>

          <v-card-text class="text--primary pt-2">
            <div>Cuci Tangan Pakai Sabun (CTPS) dengan air mengalir sangat penting untuk menjaga diri dari COVID-19</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="mb-4">
        <v-card class="mx-auto" max-width="450">
          <v-img
            class="white--text align-end"
            height="650px"
            src="https://trello-attachments.s3.amazonaws.com/5f01c772ca77868efa43581a/5f028047b9d1d15cd433fd71/fb223f3f4ed395aa5e5386a0dcc3d5bf/Cuci_Tangan_Pakai_Sabun_(CTPS).jpg"
          ></v-img>

          <v-card-subtitle
            class="pb-0 text-center black--text text-h6 font-weight-bold"
          >Poster Cuci Tangan Pakai Sabun (CTPS)</v-card-subtitle>

          <v-card-text class="text--primary pt-2">
            <div>Cuci Tangan Pakai Sabun (CTPS) dengan air mengalir sangat penting untuk menjaga diri dari COVID-19</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="mb-4">
        <v-card class="mx-auto" max-width="450">
          <v-img
            class="white--text align-end"
            height="650px"
            src="https://trello-attachments.s3.amazonaws.com/5f01c772ca77868efa43581a/5f028047b9d1d15cd433fd71/fb223f3f4ed395aa5e5386a0dcc3d5bf/Cuci_Tangan_Pakai_Sabun_(CTPS).jpg"
          ></v-img>

          <v-card-subtitle
            class="pb-0 text-center black--text text-h6 font-weight-bold"
          >Poster Cuci Tangan Pakai Sabun (CTPS)</v-card-subtitle>

          <v-card-text class="text--primary pt-2">
            <div>Cuci Tangan Pakai Sabun (CTPS) dengan air mengalir sangat penting untuk menjaga diri dari COVID-19</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >{{ next.text }}</a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >{{ eco.text }}</a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>
