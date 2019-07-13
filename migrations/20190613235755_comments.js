export const up = async knex => {
  await knex.schema.createTable("comments", t => {
    t.increments("id")
      .primary()
      .unsigned();
    t.string("comment_body", 500);
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
    t.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users");
    t.integer("image_id")
      .unsigned()
      .references("id")
      .inTable("images");
  });
};

export const down = async knex => {
  await knex.schema.dropTable("comments");
};
