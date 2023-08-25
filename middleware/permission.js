export default defineNuxtRouteMiddleware(async (to) => {
  const userPermissions = JSON.parse(localStorage.getItem('scopes'));
  if (to.meta.alias) {
    const requiredPermission = to.meta.alias.replace('/', '');
    if (requiredPermission && !userPermissions[0].includes(requiredPermission)) {
      return navigateTo('/');
    }
  }
});
