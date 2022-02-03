<template>
  <div>
    <div v-if="$store.state.member.fullname">
      <form @submit.prevent="creerConv" class="styled_form">
        <h1>Créer une conversation</h1>
        <label for="topic">Sujet : </label>
        <input v-model="topic" type="text" name="topic" id="topic" />
        <label for="label">Label : </label>
        <input v-model="label" type="text" name="label" id="label" />
        <input type="submit" value="Créer" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "conversations",
  data() {
    return {
      label: "",
      topic: "",
    };
  },
  components: {},
  methods: {
    creerConv() {
      let donnees = {
        label: this.label,
        topic: this.topic,
      };
      this.$api.post("channels", donnees).then((res) => {
        // console.log(res.data);
        this.$router.push("/conversation/" + res.data.id);
      });
    },
  },
};
</script>