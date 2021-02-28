export default async function({ $auth }) {
  if (!$auth.loggedIn) {
    return;
  }

  const auth = $auth;

  const authStrategy = auth.strategy.name;
  if (authStrategy === 'facebook' || authStrategy === 'google') {
    const token = auth.getToken(authStrategy).substr(7);
    const authStrategyConverted = authStrategy === 'facebook' ? 'fb' : 'google';
    const url = `/user/signup/${authStrategyConverted}?token=${token}`;
    console.log('auth executed');
    try {
      const { data } = await $axios.$post(url, null);
      console.log('after request');
      console.log(data);
      auth.setToken('local', 'Bearer ' + data.access_token);
      setTimeout(async () => {
        auth.setStrategy('local');
        setTimeout(async () => {
          await auth.fetchUser();
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}
