# tchat

## Axios Async Request

```js
window.axios = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  params : {
    token : false
  },
  headers: { Authorization: 'API_KEY' }
});
```

## Token

78f82a72e017cac77d925470742c28fb8919506d

Exemple avec Axios :

```js
let config = {
	headers: {'Authorization': "78f82a72e017cac77d925470742c28fb8919506d"}
}
Axios.post(api_route,params,config).then(() => { ... });
```

La connexion à l'api renvoie un token, il faut la passer en paramètre pour pouvoir intéragir avec les conversations.

## Mixin

Les mixins offrent une manière flexible de créer des fonctionnalités réutilisables pour les composants de Vue. Un objet mixin peut contenir toute option valide pour un composant. Quand un composant utilise un mixin, toutes les options du mixin seront “fusionnées” avec les options du composant. Doc [ici](https://fr.vuejs.org/v2/guide/mixins.html).

## Rendu par routeur

Certaines fois (comme dans les vues des comptes utilisateurs), la vue n'est générée qu'une fois et le contenu de la page est généré dynamiquement par requêtes ajax. Cela cause des problèmes lorsque certains paramètres d'url changent (id de l'utilisateur ou du compte ici).

Pour pallier au problème, il faut utiliser la méthode watch du composant : https://forum.vuejs.org/u/LinusBorg

```js
watch: {
  '$route.params.id': function (id) {
    this.doStuff()
  }
},
created: function () {
  this.doStuff()
},
methods: {
  doStuff() {
    this.loadInvoice().then((data) => {
        blablabla...
      })
  }
}
```