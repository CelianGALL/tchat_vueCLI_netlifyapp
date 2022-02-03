<template>
  <div id="app" class="hero">
    <header>
      <nav id="main_menu">
        <div v-if="$store.state.token.length == 0">
          <router-link v-if="$store.state.token.length == 0" to="/connexion">
            Connexion</router-link
          >
          <router-link
            v-if="$store.state.token.length == 0"
            to="/creation-compte"
            >Créer mon compte
          </router-link>
        </div>
        <div v-else>
          <router-link v-if="$store.state.token.length > 0" to="/conversations"
            >Conversations</router-link
          >
          <router-link v-if="$store.state.token.length > 0" to="/membres"
            >Membres</router-link
          >
        </div>
        <form v-if="$store.state.token != ''" @submit.prevent="deconnexion">
          <p class="connexion_status">
            Connecté en tant que {{ $store.state.member.fullname }}
          </p>
          <input type="submit" value="Déconnexion" />
        </form>
      </nav>
    </header>
    <main>
      <nav id="secondary_menu" v-if="$store.state.token != ''">
        <ul>
          <li v-for="member in $store.state.members" :key="member">
            <router-link :to="{ path: '/membre/' + member.id }" :title="member.fullname">
              <img
                class="profile_picture"
                :src="avatar(member)"
                :alt="member.fullname"
              />
              <p>
                {{ member.fullname }}
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- Render la page associée à la route, c'est en fait le contenu, le vrai -->
      <router-view />
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { Outils } from "./mixins/tools.js";

export default {
  name: "App",
  mixins: [Outils],
  mounted() {
    this.getMembers();
    this.setScrollEffect();
  },
  methods: {
    deconnexion() {
      this.$api
        .delete("members/signout")
        .then((res) => {
          this.$store.commit("destroyStorage");
          this.$router.push("/connexion");
        })
        .catch((error) => {
          alert(error.res.data.message);
        });
    },
    getMembers() {
      this.$api.get("members").then((res) => {
        this.$store.state.members = res.data;
      });
    },
    setScrollEffect() {
      /* Horizontal scroll pour la liste utilisateurs */
      const slider = document.querySelector("#secondary_menu ul");
      let mouseDown = false;
      let startX, scrollLeft;

      let startDragging = function (e) {
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };
      let stopDragging = function (event) {
        mouseDown = false;
      };

      slider.addEventListener("mousemove", (e) => {
        e.preventDefault();
        if (!mouseDown) {
          return;
        }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
      });
      // Add the event listeners
      slider.addEventListener("mousedown", startDragging, false);
      slider.addEventListener("mouseup", stopDragging, false);
      slider.addEventListener("mouseleave", stopDragging, false);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 12px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Segoe UI", Tahoma, Geneva, sans-serif;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.171);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 60px;
}

#main_menu {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  margin: 0.5rem 12px; /* Doit match le margin du body */
  justify-content: space-between;
}

#main_menu a {
  text-decoration: none;
  color: rgb(99, 99, 99);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, sans-serif;
  margin-right: 1rem;
}

#main_menu a.router-link-active {
  color: #41b883;
}

#main_menu form {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#main_menu form input {
  height: 30px;
  margin-left: 1rem;
  background: none;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-family: "Segoe UI", Tahoma, Geneva, sans-serif;
  cursor: pointer;
  padding: 0rem 1rem;
}

#main_menu p.connexion_status {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#main_menu p.connexion_status::before {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  background: #41b883;
  border-radius: 100%;
  margin-right: 0.5rem;
}

#secondary_menu {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 1rem;
}

#secondary_menu ul {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#secondary_menu ul  a {
  text-decoration: none;
  color: black;
}


#secondary_menu li {
  margin-right: 1rem;
  font-size: 0.9rem;
  width: 100%;
  max-width: 50px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

#secondary_menu ul li p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
}

#secondary_menu img.profile_picture {
  background-color: lightgray;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  border: 2px solid #41b883;
}

main {
  margin: auto;
  margin-top: 80px;
  max-width: 1000px;
  width: 100%;
}

h1 {
  font-size: 1.5rem;
}

form.styled_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin: auto;
}
form.styled_form input {
  padding: 0.7rem 0.7rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin-bottom: 0.8rem;
  font-family: "Segoe UI", Tahoma, Geneva, sans-serif;
  outline-color: #41b883;
}
form.styled_form input[type="submit"] {
  background-color: #41b883;
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
}
form.styled_form label {
  margin-top: 0;
  color: gray;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
}
form.styled_form footer p {
  text-align: right;
  margin: 0;
}

form.styled_form footer p a {
  color: #41b883;
}
</style>
