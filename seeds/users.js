export const seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        {
          id: 1,
          username: 'johnDoe',
          password: 'fish123',
          email: 'example@aol.com',
        },
      ]));
