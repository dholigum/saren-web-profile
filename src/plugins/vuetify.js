import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueNumber from 'vue-number-animation'
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

Vue.use(Vuetify);
Vue.use(VueYouTubeEmbed)
Vue.use(VueNumber)
Vue.use(AudioPlayer)

export default new Vuetify({
});
