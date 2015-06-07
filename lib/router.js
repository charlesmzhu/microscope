
//Use https://github.com/iron-meteor/iron-router/blob/devel/Guide.md to learn more.

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'})

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function () { return Posts.findOne( this.params._id); }
})

var requireLogin = function () { //this is a routing hook. It is reactive and instantly updates so we don't need a listener for when the user logs-in and a callback for what to do next. When the user state changes, somewhere in the meteor backend, a stateMap updates itself and everyone knows.
	if ( !Meteor.user() ) {
		if ( Meter.loggingIn() ) {
			this.render(this.loadingTemplate); // this refers to Router
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction('dataNotFound', {only: 'postPage'}); //dataNotFound is pre-loaded
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});