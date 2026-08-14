export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user } = useUserSession();

  // Redirect to login if not authenticated and hitting the root.
  if (!loggedIn.value && to.path === '/') {
    return navigateTo('/login');
  }

  // ---- Subscription gate for the dashboard ----
  // A logged-in user without an active subscription is sent to the plan page.
  // The session user object can be stale (it's only refreshed on login), so we
  // read the authoritative status from /api/user. This is a UX guard; the
  // server also enforces access on the data endpoints (see requirePaidUser).
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
    } catch {
      // If we can't confirm, fail safe to the plan page rather than the dashboard.
      return navigateTo('/subscribe');
    }
  }
});
