import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Documents = new Mongo.Collection('Documents');
export default Documents;

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
});

Documents.attachSchema(Documents.schema);

Meteor.startup(() => {
  if (Meteor.isServer) {
    Documents._ensureIndex({ owner: 1 });
    Documents._ensureIndex({ createdAt: -1 });
  }
});

Factory.define('document', Documents, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
