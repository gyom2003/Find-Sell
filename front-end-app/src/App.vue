<template>
  <div>
    <router-view 
    @updateDisconnect="updateDisconnect" 
    @registeredUser="updateRegisteredUser"
    @loggedIn="updateLoggedIn"
    :registeredUser="registeredUser"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      registeredUser: JSON.parse(localStorage.getItem('registeredUser')) || null, 
      isLogged: JSON.parse(localStorage.getItem('isLogged')) || null, 
      isRegistered: JSON.parse(localStorage.getItem('isRegistered')) || null, 
    }
  }, 
  methods: {
    updateDisconnect(status) {
      localStorage.setItem('isLogged', status.isLogged)
      localStorage.setItem('isRegistered', status.isRegistered)
    }, 
    updateRegisteredUser(user) {
      this.registeredUser = user
      this.isRegistered = true 
      localStorage.setItem('registeredUser', JSON.stringify(user))
      localStorage.setItem('isRegistered',this.isRegistered )
    }, 
    updateLoggedIn(status) {
      this.isLogged = status
      localStorage.setItem('isLogged', status)
    } 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
