import bookshelf from '../config/bookshelf';
import Image from './Image';


const Likes = bookshelf.Model.extend({
  tableName: 'likes',
  timestamps: false,
  soft: true,
  // this allows us to have user within comments{}
  images() {
    return this.belongsTo(Image);
  },

  likedByMe() {
    for (const like of this.Likes) {
      console.log(like);
    }
  },


});

export default Likes;
