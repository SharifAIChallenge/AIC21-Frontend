export default function({ $axios, redirect }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      redirect('/login');
    }
  });
  $axios.onRequest(config => {
    if (config.url === '/social-login/google/') {
      const code = config.data.split('&')[0].substring(5);
      console.log(code);
      console.log(config);
      config.data = { code };
      config.baseURL = 'https://aichallenge.ir/';
    }
    config.data = convertObjToSnakeCase(config.data);
  });
}

function convertObjToSnakeCase(o) {
  var newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function(value) {
      if (typeof value === 'object') {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = camelToSnakeCaseStr(origKey);
        value = o[origKey];
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

const camelToSnakeCaseStr = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
