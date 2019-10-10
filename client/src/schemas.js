import {schema} from 'normalizr';

const imageSchema = new schema.Entity( "images");
const commentSchema = new schema.Entity('comments' )
const userSchema = new schema.Entity('user')
// export const arrayOfImages = new schema.Array(imageSchema);


imageSchema.define({
    user: userSchema,
    comments: [commentSchema]
})


export const imageListSchema = [imageSchema]