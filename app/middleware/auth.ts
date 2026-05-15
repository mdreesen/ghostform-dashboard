export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn } = useUserSession();

    // redirect the user to the login screen if they're not authenticated
    if (!loggedIn.value || to.path === '/') {
      return navigateTo('/login');
    } else {
      return navigateTo('/dashboard');
    };
  });