<template>
  <div class="register-container">
    <h1>Inscription</h1>
    <PrimeDialog v-model:visible="showRegisterDialog" modal :closable="false" style="width: 30vw">
      <div class="p-fluid">
        <div class="fieldRegister">
          <label for="name">Nom</label>
          <PrimeInputText class="Primeinput" v-model="user.nom" />
        </div>
        <div class="fieldRegister">
          <label for="name">Prenom</label>
          <PrimeInputText class="Primeinput" v-model="user.prenom" />
        </div>

        <div class="fieldRegister">
          <label for="email">Email</label>
          <PrimeInputText class="Primeinput" v-model="user.email" />
        </div>

        <div class="fieldRegister">
          <label for="password">Mot de passe</label>
          <PrimeInputText class="Primeinput" v-model="user.password" type="password" />
        </div>

        <div class="buttonRegister">
          <PrimeButton label="Annuler" class="p-mr-2" @click="stayRegister" />
          <PrimeButton label="S'inscrire" @click="registerUser" />
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
  data() {
    return {
      user: {
        nom: '',
        prenom: '',
        email: '',
        password: ''
      }, 
      showRegisterDialog: true 
    };
  },
  methods: {
    stayRegister() {
      this.$router.push({ name: 'register' });
    },
      registerUser() {
        this.$emit('registeredUser', this.user); 
        this.$router.push({ name: 'login' });
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
.register-container {
  margin: 0 auto;
  width: 50%;
  text-align: center;
}
.fieldRegister {
  margin-bottom: 15px;
}
.buttonRegister {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.Primeinput {
  margin-left: 15px;
}
</style>
