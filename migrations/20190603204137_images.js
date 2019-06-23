export const up = async knex => {
    await knex.schema.createTable('images', (t) => {
        t.increments('id').primary().unsigned();
        t.string('image_title', 40);
        t.string('img_url', 250 );
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.integer('user_id').unsigned().references('id').inTable('users');
    })
};

export const down =  async knex => {
    await knex.schema.dropTable("images");
};
