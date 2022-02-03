<template>
  <div id="conversations">
    <div id="conversations_header">
      <h1>Liste des conversations</h1>
      <div v-if="$store.state.member.fullname">
        <router-link to="creer-conversation"
          >Créer une conversation</router-link
        >
      </div>
    </div>

    <div v-if="this.loaded" id="conv_list_wrapper">
      <div
        class="conv_list_container"
        v-for="conversation in this.conversations"
        :key="conversation.id"
      >
        <router-link
          :to="{
            path: 'conversation/' + conversation.id,
          }"
        >
          <p>{{ conversation.topic }}</p>
          <p>{{ conversation.id }}</p>
          <p>{{ conversation.label }}</p>
        </router-link>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="!this.loaded" id="loading_skeleton">
      <div class="conv_list_container_skeleton" v-for="i in 5" :key="i">
        <div class="conv_container">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "conversations",
  data() {
    return {
      conversations: [],
      loaded: false,
    };
  },
  mounted() {
    this.getConversations();
  },
  methods: {
    getConversations() {
      this.loaded = false;
      this.$api.get("channels").then((res) => {
        this.conversations = res.data;
        return (this.loaded = true);
      });
    },
  },
};
</script>

<style scoped>
#conversations {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

#conversations_header {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

#conversations_header a {
  padding: 0.7rem 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  margin-bottom: 0.8rem;
  font-family: "Segoe UI", Tahoma, Geneva, sans-serif;
  background-color: #41b883;
}

#conv_list_wrapper {
  width: 100%;
}

div.conv_list_container {
  background-color: transparent;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid lightgray;
  transition: 0.2s ease-in-out;
}

div.conv_list_container:hover {
  border: 1px solid #41b883;
}

div.conv_list_container a {
  text-decoration: none;
  color: black;
  width: 100%;
  height: 100%;
}

div.conv_list_container p {
  margin: 0 1rem;
}

div.conv_list_container p:nth-child(1) {
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

div.conv_list_container p:nth-child(2) {
  font-size: 0.7rem;
  color: lightgray;
}

div.conv_list_container p:nth-child(3) {
  margin-top: 1rem;
  margin-bottom: 1.7rem;
}

/* Loading skeleton */

#loading_skeleton {
  background-color: transparent;
  width: 100%;
  cursor: progress;
}

div.conv_container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid lightgray;
}

div.conv_list_container_skeleton p {
  margin: 0 1rem;
  border-radius: 3px;
  animation: skeleton-loading 1s linear infinite alternate;
}

div.conv_list_container_skeleton p:nth-child(1) {
  height: 1.5rem;
  max-width: 25rem;
  margin-top: 1rem;
}

div.conv_list_container_skeleton p:nth-child(2) {
  height: 0.7rem;
  margin-top: 0.5rem;
  max-width: 15rem;
  color: lightgray;
}

div.conv_list_container_skeleton p:nth-child(3) {
  margin-top: 1rem;
  height: 1rem;
  max-width: 50rem;
  margin-bottom: 1.7rem;
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