export default function({ $axios, redirect, store, app, route }) {
  // console.log('middle');
  const token = app.$cookies.get('token');
  // console.log(token, 'axios');
  if (token && !store.state.auth.token) {
    store.dispatch('auth/loadUser', { token });
  }
  // if (route.path.includes('dashboard') && !store.state.auth.isAuthenticated) {
  //   console.log('auth 401');
  //   return redirect('/login');
  // }
  // console.log('axios plugin', store.state.auth.isAuthenticated);
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      // console.log('axios 401');
      store.commit('auth/removeToken');
      app.$cookies.remove('token');
      redirect('/login');
    }
  });
  $axios.onRequest(config => {
    try {
      if (config.data instanceof FormData === false) config.data = convertObjToSnakeCase(config.data);
    } catch (error) {}
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
