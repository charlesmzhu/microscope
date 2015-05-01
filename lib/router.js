Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () { return Meteor.subscribe('posts'); }
});//This 

Router.route('/', {name: 'postsList'});