import bookshelf from '../config/bookshelf';
import User from './User';
import Image from './Image';

const Likes = bookshelf.Model.extend({
    tableName: 'likes',
    timestamps: false,
    // this allows us to have user within comments{}
    images(){
        return this.belongsTo(Image);
    },

    getLikeFrom(){
        
    }
   

})

export default Likes;