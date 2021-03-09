export const login = (axios, data) => {
  return axios.$post('/accounts/login', data);
};

export const getUser = axios => {
  return axios.$get('/accounts/profile');
};

export const logout = axios => {
  return axios.$post('/accounts/logout');
};

export const sendGoogleAuthCode = (axios, code) => {
  return axios.$post('/social-login/google/', { code });
};
