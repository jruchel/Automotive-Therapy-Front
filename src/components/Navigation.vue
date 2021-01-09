<template>
  <div>
    <table>
      <tr>
        <td>
          <router-link to="/order">Zlecenia</router-link>
          |
        </td>
        <td>
          <router-link to="/opinion">Opinie</router-link>
          |
        </td>
        <td v-if="!auth.loggedIn">
          <router-link to="/login">Dla pracowników</router-link>
          |
        </td>
        <td v-if="auth.loggedIn">
          <router-link to="/orders">Zlecenia</router-link>
          |
          <router-link to="/home">
            <span @click="$emit('logout')">Wyloguj</span>
          </router-link>
          |
        </td>
      </tr>
    </table>
    <br>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  inject: ["auth"],
}
</script>

<style scoped>

</style>