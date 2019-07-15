export const up = async (knex) => {
  await knex.schema.createTable('likes', (t) => {
    t.increments('id').primary().unsigned();
    t.integer('user_id').unsigned().references('id').inTable('users');
    t.integer('image_id').unsigned().references('id').inTable('images');
    t.string('likedByme').defaultTo(false);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('deleted_at').defaultTo(knex.fn.now());
    t.timestamp('restored_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('likes');
};
