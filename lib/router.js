
//Use https://github.com/iron-meteor/iron-router/blob/devel/Guide.md to learn more.

Router.configure({
  layoutTemplate: 'layout', //Layout ALWAYS loads right after main.
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () { return Meteor.subscribe('posts'); }
}); 

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', { //:_id matches and passes to router's params array. Name and data are passed to client.
  name: 'postPage', //name = name of route AND template name. To change template, pass function () { this.render('postPage') }
  data: function () { return Posts.findOne( this.params._id )}  //data = cursor passed to client.
});
Router.route('/submit', {name: 'postSubmit'})

Router.onBeforeAction('dataNotFound', {only: 'postPage'});