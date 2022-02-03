<template>
  <div id="fiche_membre" v-if="membre">
    <div>
      <h1>Fiche membre</h1>

      <!-- Il faut récupérer la liste des membres, js find l'id du membre passé en paramètre dans la route (créer un paramètre dans la route) -->
      <div id="membre">
        <div class="membre_container" :id="membre.id">
          <img
            class="profile_picture"
            :src="avatar(membre)"
            :alt="membre.fullname"
          />
          <div>
            <p class="fullname">{{ membre.fullname }}</p>
            <p class="email">{{ membre.email }}</p>
          </div>
          <p class="created_at">Membre depuis : {{ membre.created_at }}</p>
        </div>
      </div>
    </div>
    <div id="last_messages" v-if="this.loaded">
      <h2>{{ lastMessages.length }} dernier(s) message(s)</h2>
      <div
        v-for="message in lastMessages"
        :key="message"
        class="message_container"
      >
        <router-link
          :to="{
            path: '/conversation/' + message.channel_id,
          }"
          class="message"
        >
          <p class="message_content">{{ message.message }}</p>
          <p class="created_at">{{ message.created_at }}</p>
        </router-link>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="!this.loaded" id="last_messages_skeleton">
      <h2>Dernier(s) message(s)...</h2>
      <div v-for="i in 3" :key="i" class="message_skeleton_container">
        <div class="message_content_skeleton"></div>
        <div class="message_content_skeleton"></div>
        <div class="message_createdAt_skeleton"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Outils } from "../mixins/tools";

export default {
  name: "FicheMembre",
  mixins: [Outils],
  data() {
    return {
      lastMessages: [],
      loaded: false,
    };
  },
  mounted() {
    this.getLastMessages();
  },
  computed: {
    membre() {
      return this.$store.state.members.find((element) => {
        return element.id == this.$route.params["id"];
      });
    },
  },
  methods: {
    getLastMessages() {
      this.lastMessages = [];
      this.loaded = false;
      this.$api.get("channels").then((res) => {
        res.data.forEach((conversation) => {
          this.$api.get(`channels/${conversation.id}/posts`).then((res) => {
            res.data.forEach((message) => {
              if (message.member_id == this.$route.params["id"]) {
                this.lastMessages.push(message);
              }
            });
            return (this.loaded = true);
          });
        });
      });
    },
  },
  watch: {
    "$route.params.id": function (id) {
      this.getLastMessages();
    },
  },
};
</script>

<style scoped>
div.membre_container,
a.message,
div.message_skeleton_container {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1rem 1rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 1rem;
  position: relative;
  transition: 0.2s ease-in-out;
}

img.profile_picture {
  background-color: lightgray;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  border: 2px solid #41b883;
  margin-right: 0.8rem;
}

div.membre_container > p,
a.message > p {
  margin: 0;
}

a.message:hover {
  border: 1px solid #41b883;
}

div.membre_container > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

div.membre_container > div > p {
  margin: 0;
}

p.fullname {
  font-weight: bold;
}

p.email {
  color: grey;
  font-style: italic;
}

p.created_at {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  color: lightgray;
}

a.message {
  border: 1px solid lightgray;
  color: black;
  text-decoration: none;
  display: flex;
  position: relative;
  padding: 1rem;
}

/* Skeleton */

div.message_skeleton_container {
  display: flex;
  flex-direction: column;
}

#last_messages_skeleton {
  cursor: progress;
  border-radius: 5px;
}

div.message_content_skeleton {
  border-radius: 3px;
  height: 1rem;
  animation: skeleton-loading 1s linear infinite alternate;
}

div.message_content_skeleton:nth-child(1) {
  width: 17rem;
}

div.message_content_skeleton:nth-child(2) {
  width: 10rem;
  margin-top: 0.5rem;
}

div.message_createdAt_skeleton {
  width: 13rem;
  height: 1rem;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  border-radius: 3px;
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background: hsl(0, 0%, 90%);
  }

  100% {
    background: hsl(0, 0%, 100%);
  }
}
</style>