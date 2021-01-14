<template>
  <div>
    <div id="topnav" class="topnav">
      <router-link v-bind:class="{'active': isOrder}" to="/order">Zlecenia</router-link>
      <router-link v-bind:class="{'active': isOpinion}" to="/opinion">Opinie</router-link>
      <router-link v-bind:class="{'active': isLogin}" v-if="!auth.loggedIn" to="/login">Dla pracowników</router-link>
     <div v-if="auth.loggedIn">
       <router-link v-bind:class="{'active': isOrders}" to="/orders">Zlecenia</router-link>
       <router-link to="/home" v-on:click.native="$emit('logout')">Wyloguj</router-link>
     </div>
    </div>
    <br>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  inject: ["auth"],
  methods: {
    setCurrentPage(page) {
      this.clearAll()
      switch (page) {
        case 'order' :
          this.isOrder = true;
          break;
        case 'opinion':
          this.isOpinion = true;
          break;
        case 'orders':
          this.isOrders = true;
          break;
        case 'login':
          this.isLogin = true;
          break;
        default:
          this.clearAll()
      }
    },
    clearAll() {
      this.isOrder = false
      this.isLogin = false;
      this.isOpinion = false;
      this.isOrders = false;
    }
  },
  data() {
    return {
      isOrder: false,
      isOpinion: false,
      isLogin: false,
      isOrders: false
    }
  }
}
</script>

<style scoped>
.topnav {
  background-color: royalblue;
  overflow: hidden;
}

.topnav a {
  float: left;
  color: whitesmoke;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: whitesmoke;
  color: royalblue;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: black;
  color: whitesmoke;
}

</style>