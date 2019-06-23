import knex from 'knex';
import bookshelf from 'bookshelf';
import config from '../knexfile';
import cascadeDelete from 'bookshelf-cascade-delete';

const herokuOrNot = process.env.NODE_ENV !== 'production' ? config.development : config.production


const Bookshelf = bookshelf(knex(herokuOrNot));
Bookshelf.plugin('registry');
Bookshelf.plugin(cascadeDelete);

export default Bookshelf;