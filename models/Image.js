import bookshelf from '../config/bookshelf';
import User from './User';
import Comment from './Comment';

const Image = bookshelf.Model.extend({
    tableName: 'images',
    timestamps: false,

    user(){
        return this.belongsTo(User);
    },
   
    comments(){
        return this.hasMany(Comment)
    }

// this deletes images despite having a comment or not
}, { dependents: ['comments']});
export default Image;