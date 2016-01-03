import Waterline from 'waterline';
import disk from 'sails-disk';

/**
 * Waterline defines schemas as seen below. See the README for more info on
 * defining schemas and validations.
 */
export const waterline = new Waterline();

const isDev = process.env.NODE_ENV === 'development';

const Users = Waterline.Collection.extend({
  identity: 'user',
  tableName: 'users',
  connection: 'default',
  attributes: {
    username: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: true,
      minLength: 5,
      // email: true, // Not yet sure if this would work
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  migrate: isDev ? 'alter' : 'safe',
});

// Note: For some reason identities and table name must be lower case
const Things = Waterline.Collection.extend({
  identity: 'thing',
  tableName: 'things',
  connection: 'default',
  attributes: {
    name: 'string',
    owner: {
      model: 'user',
    },
  },
  migrate: isDev ? 'alter' : 'safe',
});

export const config = {
  adapters: { disk },
  connections: {
    default: {
      adapter: 'disk',
    },
  },
};

waterline.loadCollection(Users);
waterline.loadCollection(Things);

// What would be the best way to do this? We obviously don't want any other
// module to have to know about our waterline config. Just the waterline
// instance. Decided against this for now since it would provide confusion for
// anyone who saw the initialize method getting called with just one arg.
// waterline.initialize = waterline.initialize.bind(waterline, config);
