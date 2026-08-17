export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession();

  // Not authenticated at all and hitting the root -> straight to login.
  if (!loggedIn.value && to.path === '/') {
    return navigateTo('/login');
  }

  // ---- Auth + subscription gate for the dashboard ----
  // A logged-out user is sent to login/signup. A logged-in user without an
  // active subscription is sent to the plan page. The session's `loggedIn`
  // flag can be stale, so we confirm against /api/user - the authoritative
  // source. This is a UX guard; the server also enforces access on the data
  // endpoints themselves (see requirePaidUser), so this can't be bypassed by
  // skipping the client redirect.
  if (to.path.startsWith('/dashboard')) {
    if (!loggedIn.value) {
      return navigateTo('/login');
    }

    try {
      const me = await $fetch<any>('/api/user');
      const status = me?.subscriptionStatus;
      const isActive = status === 'active' || status === 'trialing' || me?.paid === true;

      if (!isActive) {
        return navigateTo('/subscribe');
      }
    } catch (error: any) {
      // A 401 means the session is missing/invalid - send to login, not the
      // plan page (this used to fail-safe to /subscribe for EVERY error,
      // which was the wrong destination for "you're not logged in").
      if (error?.statusCode === 401 || error?.response?.status === 401) {
        return navigateTo('/login');
      }
      // Any other failure (network blip, real server error): fail safe to
      // the plan page rather than letting an unconfirmed user into the
      // dashboard.
      return navigateTo('/subscribe');
    }
  }
});
