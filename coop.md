
# TD Co'op - Seance 1
## Projet du TD : Co'op, un clone de Slack en VueJS

Un exemple d'implémentation :  [https://coop-2021-gilles-francois.netlify.app](https://coop-2021-gilles-francois.netlify.app ) 

L'API est ici : [https://allweb.fun/coop/](https://allweb.fun/coop/)

Pour obtenir un token d'autorisation, suivez ce lien : [https://allweb.fun/coop/key.php](https://allweb.fun/coop/key.php)

Token API : `78f82a72e017cac77d925470742c28fb8919506d`

> ⚠️ Les niveaux d'accès ne sont pas encore faits

### Accès réservé aux membres identifiés :

 - [x] **Il faut pouvoir se créer un compte (Nom, email, mot de passe)**
 - [x] **Il faut pouvoir se connecter** *et se déconnecter*

### L'application présente 4 "écrans"
 - [x] Login
			**Se connecter / créer un compte**

 - [x] Liste des membres
			**Voir la liste des membres / Voir la fiche d'un membre /** *Supprimer un membre, sauf soit même* !

 - [x] Liste des conversations
			**Voir les conversations et leur description**

 - [x] Liste des messages d'une conversation
			**Voir les messages / Poster un Message /** *cliquer sur le nom du membre qui a posté le message pour voir la fiche / *Editer un message* / *Supprimer un message*

 - [x] Fiche d'un membre 
	 			**La fiche permet de visualiser les infos publiques d'un membre : nom, email,** *avatar ainsi que la liste des 10 derniers messages postés par le membre. Ces messages sont cliquables et permettent de visionner le message, en contexte, dans la conversation*.


### Chaque membre peut :
 - [x] **Créer une conversation (Définir un titre et description)**
 - [x] **Ouvrir toutes les conversations et voir les messages dans une conversation**
 - [x] **Poster un message dans une conversation**
 - *Modifier une conversation (modifier son titre et sa description)*
 - *Supprimer une conversation*
 - *Editer ou supprimer seulement ses propres messages*

### Chaque membre se compose:
 - [x] **D'un nom complet (nom + prenom)**
 - [x] **D'une adresse mail**
 - [x] **d'un mot de passe** *vérifié lors de sa création à l'aide d'une double saisie*
 - *D'un avatar visible sur tous ses messages, via Gravatar.com ou autre, avec un defaut sur venant d'un générateur d'avatars comme adorable.io*

*Texte italique* : éléments facultatifs (donc non prioritaires).
Quelques ressources CSS : Bulma, Knacss ou tout simplement Bootstrap
Avatars : https://vinicius73.github.io/gravatar-url-generator/


