Template.postSubmit.events({
	'submit form': function (e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(), // the target is "form". This finds a node with attribute name = url.
			title: $(e.target).find('[name=title]').val()
		};

		var errors = validatePost(post);
    	if (errors.title || errors.url)
      		return Session.set('postSubmitErrors', errors);

		Meteor.call( 'postInsert', post, function ( error, result ) { //Meteor.call is a special function that allows for a callback on any errors as well as the return of the function
			if ( error ) {
				return throwError(error.reason); //read about the error object. Error.reason?
			}

			if ( result.postExists ) {
				throwError('This link has already been posted');
			}

			Router.go ( 'postPage', { _id: result._id } );
		} )
		return false;//In book, they advocate for e.preventDefault() at the top. We'll see if this works! (It does)
	}
})

Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});


//After meteor remove insecure, you need to explicitly allow post inserts