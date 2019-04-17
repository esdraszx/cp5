<template>
  <div class="home">
    <div v-if="user">
      <div v-if="user.name != undefined">
        Welcome {{ user.name }}. You are currently loged in as {{ user.username }}.
      </div>
    </div>
    <div v-else>
      <h1>Time Report</h1>
      <h2>Welcome! To start reporting your time go to <router-link to="/mypage">Your Page</router-link></h2>
      <p>In your page you will be able to clock in and clock out and you will be able to see<br/>
      all your time punches. If you do not have a user set up, you can go to "My Page" and register. <br/>
      When registering, to have admin rights just type <b>"Admin"</b> on the first box of the form</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
}
</script>

<style scoped>

.home {
  text-align: center;
}

</style>
