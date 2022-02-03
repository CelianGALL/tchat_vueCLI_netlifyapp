<template>
  <div>
    <form class="styled_form" @submit.prevent="connexion">
      <h1>Connexion</h1>
      <label for="email">Adresse électronique</label>
      <input v-model="email" type="email" name="email" id="email" />
      <label for="mdp">Mot de passe</label>
      <input v-model="password" type="password" name="mdp" id="mdp" />
      <input type="submit" value="Valider" name="valider" id="valider" />
      <footer>
        <p>OU <router-link to="creation-compte">S'inscrire</router-link></p>
      </footer>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "jean@gmail.com",
      password: "1234",
    };
  },
  methods: {
    connexion() {
      let donnees = {
        email: this.email,
        password: this.password,
      };
      this.$api
        .post("members/signin", donnees)
        .then((res) => {
          // Un token est retourné à la connexion pour le maintien de l'état. On le save dans le store
          this.$store.commit("setConnexion", res.data.token);
          this.$store.commit("setMember", res.data.member);
          this.$router.push("/conversations");
        })
        .catch((error) => {
          alert(error.res.data.message);
        });
    },
  },
};
</script>