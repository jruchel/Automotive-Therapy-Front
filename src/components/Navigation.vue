<template>
  <div>
    <router-link to="/order">Zlecenia</router-link> |
    <router-link to="/opinion">Opinie</router-link> |
    <router-link to="/login">Log in</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Navigation",
}
</script>

<style scoped>

</style>