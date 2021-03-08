// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '939108343385-ki4hppc0879jktshp5po57lhihn617st.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
