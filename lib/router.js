Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () { return Meteor.subscribe('posts'); }
}); 

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', { //:_id matches and passes to router's params array
  name: 'postPage',
  data: function () { return Posts.findOne( this.params._id )} //name referes to both the name of the route AND the name of the template if not done explicitly. E.g. this.render('postPage'_the keyvals here are passed to the client. template = name. data = cursor passed to client.
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});