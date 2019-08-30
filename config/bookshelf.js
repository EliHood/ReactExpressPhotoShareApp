import knex from 'knex';
import bookshelf from 'bookshelf';
import cascadeDelete from 'bookshelf-cascade-delete';
import bookshelfSoftDelete from 'bookshelf-soft-delete';
import config from '../knexfile';
import bookshelfEloquent from 'bookshelf-eloquent';

const herokuOrNot = process.env.NODE_ENV !== 'production'
  ? config.development
  : config.production;

const Bookshelf = bookshelf(knex(herokuOrNot));
Bookshelf.plugin('registry');
Bookshelf.plugin(bookshelfSoftDelete);
Bookshelf.plugin(cascadeDelete);
Bookshelf.plugin(bookshelfEloquent);

export default Bookshelf;
