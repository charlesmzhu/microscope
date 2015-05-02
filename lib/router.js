Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () { return Meteor.subscribe('posts') },
  notFoundTemplate: "notFound"
});//This 

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', { //assigns this.params._id to the user query 
	name: 'postPage',
	data: function () { 
		return Posts.findOne(this.params._id);//This route is an object and we can access its params object, Router.route.data == Object with {{title}} and {{domain}} props
	}
}); //":" means match whatever comes after /posts into the Router's param array as the variable _id

Router.onBeforeAction ('dataNotFound', {only:'postPage'} )//dataNotFound is a special hook you can use to route to notFound template when the postPage template returns false as well