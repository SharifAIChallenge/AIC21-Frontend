// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '939108343385-eaucec979dh9pgmaohuhv9qrqdu7asi1.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
