Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () { return Meteor.subscribe('posts'); }
});//This 

Router.route('/', {name: 'postsList'});