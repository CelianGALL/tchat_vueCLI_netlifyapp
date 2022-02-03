// Qu'est-ce qu'un mixin ?
// https://fr.vuejs.org/v2/guide/mixins.html

export const Outils = {
	methods: {
		avatar(member) {
			return `https://eu.ui-avatars.com/api/?name=${member.fullname}&rounded=true&bold=true&background=ffffff`;
		}
	}
};