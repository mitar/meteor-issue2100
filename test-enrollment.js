if (Meteor.isClient) {
  Accounts.ui.config({passwordSignupFields: 'USERNAME_AND_EMAIL'});
  Template.hello.usersWithoutUsername = function () {
    return Meteor.users.find({username: {$exists: false}, 'emails.verified': true}).count()
  };
  Template.hello.events({
    'click .invite': function (e, template) {
	  Meteor.call('invite', $(template.findAll('.email')).val());
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish(null, function () {
	return Meteor.users.find();
  });
  Meteor.methods({
    'invite': function (email) {
	  var userId = Accounts.createUser({email: email});
	  Accounts.sendEnrollmentEmail(userId);
	}
  });
}
