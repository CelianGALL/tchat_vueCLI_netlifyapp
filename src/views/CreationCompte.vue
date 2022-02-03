<template>
  <div>
    <form class="styled_form" @submit.prevent="validation">
      <h1>Créer un compte</h1>
      <label for="fullname">Nom</label>
      <input v-model="fullname" type="text" name="fullname" id="fullname" />
      <label for="email">Adresse électronique</label>
      <input v-model="email" type="email" name="email" id="email" />
      <label for="mdp">Mot de passe</label>
      <input v-model="password" type="password" name="mdp" id="mdp" />
      <input type="submit" value="Valider" name="valider" id="valider" />
      <footer>
        <p>OU <router-link to="Connexion">Se connecter</router-link></p>
      </footer>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: "jean",
      email: "jean@gmail.com",
      password: "1234",
    };
  },
  methods: {
    validation() {
      let donnees = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
      };
      this.$api
        .post("members", donnees)
        .then((res) => {
          this.$router.push("/connexion");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>