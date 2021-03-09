export default function({ app, store, redirect, route }) {
  const token = app.$cookies.get('token');
  if (token && !store.state.auth.token) {
    store.dispatch('auth/loadUser', { token });
  }
  if (route.path.includes('dashboard') && !store.state.auth.isAuthenticated) {
    return redirect('/login');
  }
}
