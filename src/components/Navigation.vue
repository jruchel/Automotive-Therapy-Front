<template>
  <div>
    <table>
      <tr>
        <td>
          <router-link to="/home">Home</router-link>
        </td>
        <td>
          <router-link to="/about">About</router-link>
        </td>
        <td>
          <router-link to="/login">Log in</router-link>
        </td>
      </tr>
    </table>
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