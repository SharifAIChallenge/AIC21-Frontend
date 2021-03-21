import colors from 'vuetify/es5/util/colors';
import fa from 'vuetify/es5/locale/fa';
require('dotenv').config();

const [MODE, a] = process.env.TOF_MODE;
console.log(MODE);
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/fav-icon/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/fav-icon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/fav-icon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/fav-icon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/fav-icon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/fav-icon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/fav-icon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/fav-icon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/fav-icon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/fav-icon/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/fav-icon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '36x36', href: '/fav-icon/android-icon-36x36.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/fav-icon/android-icon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '72x72', href: '/fav-icon/android-icon-72x72.png' },
      { rel: 'manifest', type: 'image/png', href: '/fav-icon/manifest.json' },
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#eb3654',
    height: '2px',
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/fonts/fonts.scss',
    '@/assets/style.scss',
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/axios.js',
    { src: '~/plugins/vue-google-oauth2', ssr: false },
    { src: '~plugins/nuxt-quill-plugin', ssr: false },
    { src: '~plugins/crisp.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv'],
    '@nuxtjs/toast',
    '@nuxtjs/markdownit',
    '@nuxtjs/svg',
  ],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    runtime: true,
    typographer: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs',
      [
        'markdown-it-anchor',
        {
          level: 1,
          // slugify: string => string,
          permalink: true,
          // renderPermalink: (slug, opts, state, permalink) => {},
          permalinkClass: 'header-anchor',
          permalinkSymbol: '¶',
          permalinkBefore: true,
        },
      ],
      'markdown-it-toc-done-right',
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: MODE == 's' ? 'https://stg.aichallenge.ir/api/' : 'https://aichallenge.ir/api/',
    browserBaseURL: MODE == 's' ? 'https://stg.aichallenge.ir/api/' : 'https://aichallenge.ir/api/',
    // browserBaseURL: 'https://aichallenge.sharif.edu/api',
    // baseURL: process.env.baseURL,
    // baseURL: 'https://aichallenge.sharif.edu/api',
    // baseURL: 'http://172.17.0.1:8000/api'
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false,
    },
    lang: {
      locales: { fa },
      current: 'fa',
    },
    treeShake: true,
    rtl: true,
    theme: {
      options: {
        customProperties: true,
      },
      dark: true,
      themes: {
        dark: {
          primary: '#eb3654',
          accent: colors.pink.base,
          secondary: '#42b3aa',
          warning: colors.amber.base,
          bg: '#0e1224',
          shades: '#090c18',
          error: '#ffb300',
          success: '#00c853',
          info: '#0091ea',
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      // You can extend webpack config here
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
    },
  },
  router: {
    middleware: ['auth'],
  },
  toast: {
    position: 'bottom-center',
    theme: 'bubble',
    duration: 4000,
    keepOnHover: true,
    className: ['v-application', 'v-application--is-rtl'],
  },
};
