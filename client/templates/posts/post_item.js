Template.postItem.helpers({
	//Detemrine author of the current post using this.
	//Determine if current user is == author of the current post.
	//return true

	ownPost: function () {
		return this.userId == Meteor.userId() && this.userId != undefined;
	},

	domain: function () {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
})