export default () => {
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = '20593a63-e04e-4a0d-9b91-db54a4a9465d';

  (function() {
    var d = document;
    var s = d.createElement('script');

    s.src = 'https://client.crisp.chat/l.js';
    s.async = 1;
    d.getElementsByTagName('head')[0].appendChild(s);
  })();
};
