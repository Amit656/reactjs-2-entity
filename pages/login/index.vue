<template>
  <div class=" text-center text-xl">
    Welcome, 3PL Dashboard
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const baseURL = config.public.THREEPL_URL;
const apiURL = config.public.THREEPL_API_URL;
const route = useRoute();
const response = await fetch(
  `${apiURL}/stallion/access/token/${route.query.key}`,
);
if (response.status === 401) {
  navigateTo(`${baseURL}/login`, {
    external: true,
  });
}
const data = await response.json();
localStorage.setItem('access_token', data.token.access_token);
localStorage.setItem('user_info', JSON.stringify(data.user));
localStorage.setItem('user_id', data.user.id);
navigateTo(data.token.redirect_link, {
  external: true,
});
</script>

<style lang="scss" scoped>

</style>
