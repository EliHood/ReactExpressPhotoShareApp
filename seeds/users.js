
export const seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'johnDoe',
          password:'fish123', 
          email: 'example@aol.com',

        },
  
      ]);
    });
};
