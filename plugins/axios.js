export default function({ $axios, redirect, store }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    console.log(error);
    if (code === 401) {
      store.commit('auth/removeToken');
      redirect('/login');
    }
  });
  $axios.onRequest(config => {
    // console.log(store);
    if (store.state.auth.isAuthenticated) config.headers.common['Authorization'] = 'token ' + store.state.auth.token;
    if (typeof config.data === 'object') config.data = convertObjToSnakeCase(config.data);
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
