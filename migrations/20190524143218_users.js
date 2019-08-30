export const up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary().unsigned();
    t.string('googleId', 500).defaultTo(null);
    t.string('username', 100).unique().index();
    t.string('password', 250);
    t.string('email', 100).unique().index();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('users');
};
