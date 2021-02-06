export const signup = (axios, data) => {
  const config = {
    url: '/accounts/signup',
    method: 'post',
    headers: {
      Authorization: false,
    },
    ['data']: { ...data, password_1: data.password, password_2: data.password }, // speak to backend for convert password_1 to password
  };

  return axios(config);
};

// export const RESET_PASSWORD = {
//   name: 'RESET_PASSWORD',
//   method: 'post',
//   payload: 'data',
//   url: '/accounts/password/reset',
// };

export const resetPassword = (axios, email) => {
  const config = {
    url: '/accounts/password/reset',
    method: 'post',
    headers: {
      Authorization: false,
    },
    ['data']: { email },
  };

  return axios(config);
};

// export const RESET_PASSWORD_CONFIRM = {
//   name: 'RESET_PASSWORD_CONFIRM',
//   method: 'post',
//   payload: 'data',
//   url: '/accounts/password/reset/confirm',
// };

//todo check this!
//change hesam
export const resetPasswordConfirm = (axios, data) => {
  const config = {
    url: '/accounts/password/reset/confirm',
    method: 'post',
    ['data']: data,
  };

  return axios(config);
};


//change hesam
export const changePassword = (axios, data) => {
  const config = {
    url: '/accounts/password/change',
    method: 'post',
    ['data']: data,
  };

  return axios(config);
};

// export const EDIT_PROFILE = {
//   name: 'EDIT_PROFILE',
//   method: 'put',
//   payload: 'data',
//   url: '/accounts/profile',
// };

//change hesam
export const editProfile = (axios, data) => {
  console.log(data)
  const config = {
    url: '/accounts/profile',
    method: 'put',
    ['data']: data,
  };

  return axios(config);
};

//team
export const CREATE_TEAM = {
  name: 'CREATE_TEAM',
  method: 'post',
  payload: 'data',
  url: '/participation/team',
};

export const createTeam=(axios,data)=>{
  console.log(data);
  const config={
    url:'/accounts/profile',
    method:'post',
    ['data']:data,
  };
  return axios(config);
}

export const LEAVE_TEAM = {
  name: 'LEAVE_TEAM',
  method: 'delete',
  url: '/participation/team',
};

export const EDIT_TEAM = {
  name: 'EDIT_TEAM',
  method: 'put',
  payload: 'data',
  url: '/participation/team',
};

export const getTeamDetail = axios => {
  return axios.$get('/participation/team');
};

export const getTeamDetailWithParams = (axios, params) => {
  return axios.$get('/participation/team', params);
};

export const INVITE = {
  name: 'INVITE',
  method: 'post',
  payload: 'data',
  url: '/participation/invitation/invite',
};

export const RECEIVED_INVITATIONS = {
  name: 'RECEIVED_INVITATIONS',
  method: 'get',
  url: '/participation/invitation/invitations-to-me',
};

export const SENT_INVITATIONS = {
  name: 'SENT_INVITATIONS',
  method: 'get',
  url: '/participation/invitation/invitations-to-others',
};

export const ANSWER_INVITATION = {
  name: 'ANSWER_INVITATION',
  method: 'post',
  url: '/participation/invitation',
  payload: 'data',
  slug: 'id',
};

export const TOGGLE_MULTI_FRIENDLY = {
  name: 'TOGGLE_MULTI_FRIENDLY',
  method: 'post',
  url: '/participation/team/multi-friendly',
};

//challenge
export const SUBMIT_CODE = {
  name: 'SUBMIT_CODE',
  method: 'post',
  payload: 'data',
  url: '/challenge/submission/submit',
};

export const SUBMIT_LARGE_CODE = {
  name: 'SUBMIT_LARGE_CODE',
  method: 'post',
  payload: 'data',
  url: 'https://analysaur.ir/api/storage/file/',
};

export const VIEW_SUBMISSIONS = {
  name: 'VIEW_SUBMISSIONS',
  method: 'get',
  url: '/challenge/submission/submissions',
};

export const CHANGE_FINAL_SUBMISSION = {
  name: 'CHANGE_FINAL_SUBMISSION',
  method: 'put',
  slug: 'id',
  url: '/challenge/submission/change_final',
};

//games
export const REQUEST_FRIENDLY_MATCH = {
  name: 'REQUEST_FRIENDLY_MATCH',
  method: 'post',
  url: '/challenge/game/friendly',
  payload: 'data',
};

export const VIEW_MATCHES = {
  name: 'VIEW_MATCHES',
  method: 'get',
  url: '/challenge/games',
  params: ['offset', 'count'],
};
export const VIEW_LOBBY = {
  name: 'VIEW_LOBBY',
  method: 'get',
  url: '/challenge/game/lobby',
};

// scoreboard
//change saman
// export const GET_SCOREBOARD = {
//   friendly: {
//     name: 'GET_FRIENDLY_SCOREBOARD',
//     method: 'get',
//     url: '/scoreboard/friendly',
//   },
//   seeding: {
//     name: 'GET_CHALLENGE_SCOREBOARD',
//     method: 'get',
//     url: '/scoreboard/challenge',
//   },
//   groups: {
//     name: 'GET_GROUPS_SCOREBOARD',
//     method: 'get',
//     url: '/scoreboard/league',
//   },
// };
export const getScoreBoard=(axios,tab)=>{
  const config ={
    friendly: {
      url: '/scoreboard/friendly',
      name: 'GET_FRIENDLY_SCOREBOARD',
      method: 'get',
    },
    seeding: {
      url: '/scoreboard/challenge',
      name: 'GET_CHALLENGE_SCOREBOARD',
      method: 'get',
    },
    groups: {
      url: '/scoreboard/league',
      name: 'GET_GROUPS_SCOREBOARD',
      method: 'get',
    },
  };
  return axios.$get(config[tab].url)
}
//change saman
// export const GET_CHALLENGE = {
//   name: 'PRIMARY_CHALLENGE',
//   method: 'get',
//   url: '/challenge/challenges',
//   slug: 'id',
// };
export const getChallenge=(axios,challenge)=>{
const config={
  name: 'PRIMARY_CHALLENGE',
  method: 'get',
  url: '/challenge/challenges',
  slug: 'id',
}
return axios.$get(`${config.url}/${challenge}`)
}

export const GAME_STATS = {
  name: 'GAME_STATS',
  method: 'get',
  url: '/challenge/game/stats',
};
