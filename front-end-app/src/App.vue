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
      registeredUser: JSON.parse(sessionStorage.getItem('registeredUser')) || null, 
      isLogged: JSON.parse(sessionStorage.getItem('isLogged')) || null, 
      isRegistered: JSON.parse(sessionStorage.getItem('isRegistered')) || null, 
    }
  }, 
  methods: {
    updateDisconnect(status) {
      sessionStorage.setItem('isLogged', status.isLogged)
      sessionStorage.setItem('isRegistered', status.isRegistered)
    }, 
    updateRegisteredUser(user) {
      this.registeredUser = user
      this.isRegistered = true 
      sessionStorage.setItem('registeredUser', JSON.stringify(user))
      sessionStorage.setItem('isRegistered',this.isRegistered )
    }, 
    updateLoggedIn(status) {
      this.isLogged = status
      sessionStorage.setItem('isLogged', status)
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
