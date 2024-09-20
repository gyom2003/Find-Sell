<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <PrimeDialog v-model:visible="showLoginDialog" modal :closable="false" style="width: 30vw">
      <div class="p-fluid">
        <div class="fieldLogin">
          <label for="email">Email</label>
          <PrimeInputText class="Primeinput" v-model="user.email" />
        </div>

        <div class="fieldLogin">
          <label for="password">Mot de passe</label>
          <PrimeInputText class="Primeinput" v-model="user.password" type="password" />
        </div>

        <div class="buttonLogin">
          <PrimeButton label="Annuler" class="p-mr-2" @click="goToRegister" />
          <PrimeButton label="Se connecter" @click="loginUser" />
        </div>
      </div>
    </PrimeDialog>
  </div>
</template>

<script>
import PrimeButton from 'primevue/button';
import PrimeInputText from 'primevue/inputtext';
import PrimeDialog from 'primevue/dialog';

export default {
  props: ['registeredUser'], 
  data() {
    return {
      user: {
        email: '',
        password: ''
      }, 
      isLoggedState: false, 
      showLoginDialog: true
    };
  },
  methods: {
    goToRegister() {
      this.$router.push({ name: 'login' });
    },
    loginUser() {
      if (this.user.email === this.registeredUser.email && this.user.password === this.registeredUser.password) {
        this.isLoggedState = true
        this.$emit('loggedIn', this.isLoggedState); 
        this.$router.push({ name: 'home' });
      } else {
        this.isLoggedState = false
        alert("mauvais input pour le login ! ", this.user)
      }
    }
  },
  components: {
    PrimeButton,
    PrimeInputText,
    PrimeDialog
  }
};
</script>

<style scoped>
.login-container {
  margin: 0 auto;
  width: 50%;
  text-align: center;
}
.fieldLogin {
  margin-bottom: 15px;
}
.buttonLogin {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.Primeinput {
  margin-left: 15px;
}
</style>
