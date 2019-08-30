import bookshelf from '../config/bookshelf';
import Image from './Image';


const Likes = bookshelf.Model.extend({
  tableName: 'likes',
  timestamps: false,

  
  // this allows us to have user within comments{}
  images() {
    return this.belongsTo(Image);
  },



});



export default Likes;
