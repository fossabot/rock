import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: { first: 'Gwenaël', last: 'Gallon' },
    },
    roles: ['super-admin'],
  }];

  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      Meteor.users.update(userId, { $set: { 'emails.0.verified': true } });
      Roles.addUsersToRoles(userId, roles, Roles.GLOBAL_GROUP);
    }
  });
}
