import bookshelf from '../config/bookshelf';
import User from './User';
import Image from './Image';

const Comment = bookshelf.Model.extend({
    tableName: 'comments',
    timestamps: false,
    // this allows us to have user within comments{}
    user(){
        return this.belongsTo(User);
    },
    images(){
        return this.belongsTo(Image);
    }
})

export default Comment;