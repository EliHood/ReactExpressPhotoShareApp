import bookshelf from '../config/bookshelf';
import User from './User';
import Comment from './Comment';
import Likes from './Likes';

const Image = bookshelf.Model.extend(
  {
    tableName: 'images',
    timestamps: false,

    user() {
      return this.belongsTo(User);
    },

    comments() {
      return this.hasMany(Comment);
    },

    likes() {
      return this.hasMany(Likes)
    },
   
  

    
    
 
    // this deletes images despite having a comment or not
  },
  { dependents: ['comments', 'likes'] },
);
export default Image;
