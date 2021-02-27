import colors from 'vuetify/es5/util/colors';
import fa from 'vuetify/es5/locale/fa';
require('dotenv').config();
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
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
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
  plugins: ['~/plugins/i18n.js', '~/plugins/axios.js', { src: '~plugins/nuxt-quill-plugin', ssr: false }],
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
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv'],
    '@nuxtjs/toast',
    '@nuxtjs/markdownit',
    '@nuxtjs/svg',
    '@nuxtjs/firebase',
  ],
  firebase: {
    config: {
      apiKey: 'AIzaSyDtXWh4UP3nDBeDUudcqGyVjIJ4GLGh64M',
      authDomain: 'aichallenge-304910.firebaseapp.com',
      projectId: 'aichallenge-304910',
      storageBucket: 'aichallenge-304910.appspot.com',
      messagingSenderId: '939108343385',
      appId: '1:939108343385:web:91529ac9fec89612569b48',
      measurementId: 'G-RXW9NMM24B',
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      messaging: {
        createServiceWorker: true,
        actions: [
          {
            action: 'goToLupasGithub',
            url: 'https://github.com/lupas',
          },
          {
            action: 'goToModuleGithub',
            url: 'https://github.com/nuxt-community/firebase-module',
          },
        ],
        fcmPublicVapidKey: 'BMYHV8jvmOJUQQWxVl0WrvkE6NNdQ-zZz37egrtRww6cLayU-ybLj-tZfbrScQ1hSFLCM6VWamR-KI13fiaUr3Q',
      },
    },
  },

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
    browserBaseURL: process.env.baseURL,
    // browserBaseURL: 'https://aichallenge.sharif.edu/api',
    baseURL: process.env.baseURL,
    // baseURL: 'https://aichallenge.sharif.edu/api',
    // baseURL: 'http://172.17.0.1:8000/api'
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
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
          info: colors.blue.base,
          warning: colors.amber.base,
          error: colors.red.accent3,
          success: colors.green.accent4,
          bg: '#160031',
          shades: '#090c18',
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
  auth: {
    plugins: [{ src: '~/plugins/axios', ssr: true }, '~/plugins/auth.js'],
    redirect: {
      home: '/dashboard',
    },
    strategies: {
      google: {
        clientId: '864043474548-9is9rd8jbf3bbq4tdrhsfdjnivasj7l6.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'code',
        endpoints: {
          token: 'https://api-stg.aichallenge.ir/social-login/google/',
          userInfo: 'https://api-stg.aichallenge.ir/auth/',
        },
      },
      local: {
        endpoints: {
          login: {
            url: '/accounts/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/accounts/logout', method: 'post' },
          user: {
            url: '/accounts/profile',
            method: 'get',
            propertyName: 'user',
          },
        },
        tokenRequired: true,
        tokenType: 'token',
      },
    },
    resetOnError: true,
  },
  toast: {
    position: 'bottom-center',
    theme: 'bubble',
    duration: 4000,
    keepOnHover: true,
    className: ['v-application', 'v-application--is-rtl'],
  },
};
