export const login = (axios, data) => {
  return axios.$post('/accounts/login', data);
};

export const getUser = axios => {
  return axios.$get('/accounts/profile');
};

export const logout = axios => {
  return axios.$post('/accounts/logout');
};

export const sendGoogleAuthCode = (axios, data) => {
  return axios.$post('/accounts/social-login', data);
};

export const activeAccount = (axios, eid, token) => {
  return axios.$get(`/accounts/activate/${eid}/${token}`);
};

export const isAccountActivated = (axios, email) => {
  return axios.$post('/accounts/is-active', { email });
};
