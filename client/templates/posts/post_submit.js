Template.postSubmit.events({
	'submit form': function (e) {

		var post = {
			url: $(e.target).find('[name=url]').val(), // the target is "form". This finds a node with attribute name = url.
			title: $(e.target).find('[name=title]').val()
		};

		if (post.url.slice(0,7) != "http://") {
			$("#url").after("<p id='errorHttp'>Make sure you have 'http://'' in front!</p>");
			$("#errorHttp").css("color", "red");
			return false;
		}

		Meteor.call( 'postInsert', post, function ( error, result ) { //Meteor.call is a special function that allows for a callback on any errors as well as the return of the function
			if ( error ) {
				alert(error.reason); //read about the error object. Error.reason?
			}

			if ( result.postExists ) {
				alert("This post already exists!");
			}

			Router.go ( 'postPage', { _id: result._id } );
		} )
		return false;//In book, they advocate for e.preventDefault() at the top. We'll see if this works! (It does)
	}
})

//After meteor remove insecure, you need to explicitly allow post inserts