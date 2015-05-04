Posts = new Mongo.Collection("posts");

//Create postINsert method 
//Check userId is a string
//Check title and url of user is a string
//Include userId, author, and submitted
//Insert the post

Meteor.methods({
	postInsert: function (postAttributes){
		check ( Meteor.userId(), String );
		check ( postAttributes, {title: String, url: String} );
		var user = Meteor.user();
		var post = _.extend ( postAttributes, {
			_id: user._id,
			submitted: new Date(),
			author: user.username
		})

		var postId = Post.insert(post); //insert returns id
		return {
			_id: postId
		};
	}
});
