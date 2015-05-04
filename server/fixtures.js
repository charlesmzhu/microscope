if (Posts.find().count() == 0 ) {
	Posts.insert({
    	title: 'Introducing Telescope',
    	url: 'http://sachagreif.com/introducing-telescope/',
      author: 'Meteor Staff'
  	});

  Posts.insert({
    	title: 'Meteor',
    	url: 'http://meteor.com',
      author: 'Meteor Staff'
  	});

  Posts.insert({
    	title: 'The Meteor Book',
    	url: 'http://themeteorbook.com',
      author: 'Meteor Staff'
  });
} 