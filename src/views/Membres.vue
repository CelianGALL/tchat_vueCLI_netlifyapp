<template>
  <div>
    <h1>Liste des membres</h1>
    <div id="membres">
      <div
        v-for="membre in this.$store.state.members"
        :key="membre.id"
        class="membre_container"
        :id="membre.id"
      >
        <div>
          <router-link
            :to="{
              path: 'membre/' + membre.id,
            }"
          >
            <p class="fullname">{{ membre.fullname }}</p>
          </router-link>
          <p class="email">{{ membre.email }}</p>
        </div>
        <p class="created_at">Membre depuis : {{ membre.created_at }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.membre_container {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1rem 1rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 1rem;
  position: relative;
}

div.membre_container > p,
div.membre_container > div > p,
div.membre_container > div > a > p {
  margin: 0;
}

div.membre_container a {
  color: black;
  text-decoration: none;
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
</style>