<template>
  <div>
    <h1>{{ convData.topic }}</h1>
    <div id="conversation">
      <form
        @submit.prevent="posterMessage"
        class="styled_form"
        id="message_form"
      >
        <h2>Poster un message</h2>
        <label for="message">Message</label>
        <input v-model="message" type="text" name="message" id="message" />
        <input type="submit" value="Valider" name="valider" id="valider" />
      </form>
      <div id="messages">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message_container"
          :id="message.id"
        >
          <router-link
            :to="{
              path: '/membre/' + message.member_id,
            }"
            ><p class="member_id">
              {{ membre(message.member_id).fullname }}
            </p></router-link
          >
          <p class="message">{{ message.message }}</p>
          <p class="created_at">{{ message.created_at }}</p>
          <div v-if="message.member_id == $store.state.member.id" class="delete_icon" @click="deleteMessage(message.id)">🞭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "conversation",
  data() {
    return {
      message: "",
      messages: [],
      convData: "",
    };
  },
  mounted() {
    this.getMessages();
    this.getConversationData();
  },
  components: {},
  methods: {
    getConversationData() {
      this.$api
        .get(`channels/${this.$route.params["id"]}`)
        .then((res) => {
          this.convData = res.data;
          console.log(this.convData);
        });
    },
    getMessages() {
      this.$api
        .get(`channels/${this.$route.params["id"]}/posts`)
        .then((res) => {
          this.messages = res.data;
        });
    },
    membre(id) {
      return this.$store.state.members.find((element) => {
        return element.id == id;
      });
    },
    posterMessage() {
      let member_id = this.$store.state.member.id;
      let message = this.message;
      this.$api
        .post(`channels/${this.$route.params["id"]}/posts`, {
          member_id,
          message,
        })
        .then((res) => {
          this.getMessages();
        });
    },
    deleteMessage(id) {
      this.$api
        .delete(`channels/${this.$route.params["id"]}/posts/${id}`)
        .then((res) => {
          let container = document.getElementById(id);
          container.classList.add("disappearing");
          setTimeout(() => {
            this.getMessages();
          }, 300);
        });
    },
  },
};
</script>

<style scoped>
#message_form {
  position: sticky;
  top: 80px;
  margin: 0 0 0 1rem;
}

#message_form h2 {
  margin-top: 0;
}

#messages {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#conversation {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
}

div.message_container {
  width: 100%;
  padding: 1rem 1rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 1rem;
  position: relative;
  opacity: 1;
  transition: opacity 0.3s ease-in;
}

div.disappearing {
  border-color: red;
  opacity: 0;
}

div.message_container:hover div.delete_icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

div.message_container > p {
  margin: 0;
}

div.message_container a {
  text-decoration: none;
  color: black;
}

/* p.message {
}
*/

p.member_id {
  font-weight: bold;
  margin: 0;
  color: black;
  text-decoration: none;
}

p.created_at {
  position: absolute;
  bottom: 1rem;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  color: lightgray;
}

div.delete_icon {
  display: none;
  font-size: 0.9rem;
  width: 24px;
  height: 24px;
  position: absolute;
  top: -12px;
  right: -12px;
  color: lightgray;
  border-radius: 100%;
  border: 1px solid lightgray;
  background-color: white;
  cursor: pointer;
  transition: 0.1s ease-in-out;
}

div.delete_icon:hover {
  color: red;
  border-color: red;
}
</style>