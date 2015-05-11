Posts = new Mongo.Collection("posts");

//Posts.allow if userId owns the doc ownsDocument ( userId, doc )

Posts.allow ({ //second argument refers to existing post
	update: function ( userId, doc ) { return ownsDocument( userId, doc ) },
	remove: function ( userId, doc ) { return ownsDocument( userId, doc ) } 
})

Posts.deny ({
	update: function ( userId, doc, fieldNamesForUpdate ) {
		return ( _.without ( fieldNamesforUpdate, 'url', 'title').length > 0 );
	}
})

Posts.deny({
	update: function( userId, post, fieldNames, modifier) {
    	var errors = validatePost(modifier.$set);
    	return errors.title || errors.url;
  	}
});

Meteor.methods({
	postInsert: function (postAttributes){
		check ( Meteor.userId(), String );
		check ( postAttributes, {title: String, url: String} );
		var user = Meteor.user();
		var post = _.extend ( postAttributes, {
			userId: user._id,
			submitted: new Date(),
			author: user.username
		})

		var errors = validatePost(postAttributes);
    	if (errors.title || errors.url)
      		throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

		var postWithSameLink = Posts.findOne ( { url: postAttributes.url } )

		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var postId = Posts.insert(post); //insert returns id
		return {
			_id: postId
		};
	},

	checkDuplicateUrl: function ( url ) {
		return Posts.find ( { url: url } );
	}

});

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (post.url.slice(0,7) != "http://")
  	errors.url =  "Must include 'http://' in front"
  if (!post.url)
    errors.url =  "Please fill in a URL";
  return errors;
};


/*You might have noticed that nowhere in our post editing code do we check for duplicate links. This means a user could submit a link and then edit it to change its URL to bypass that check. The solution to this issue would be to also use a Meteor method for the edit post form, but we'll leave this as an exercise to the reader.*/