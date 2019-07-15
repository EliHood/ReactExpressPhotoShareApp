import express from 'express';
import multer from 'multer';
import multipart from 'connect-multiparty';
import cloudinary from 'cloudinary';
import Image from '../models/Image';
import Comment from '../models/Comment';
import Likes from '../models/Likes';

const multipartMiddleware = multipart();
const cloud = cloudinary.v2;
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.cloudinaryName,
  api_key: process.env.cloudinaryKey,
  api_secret: process.env.cloudinarySecret,
});
router.get('/uploads', (req, res) => {
  Image.query((image) => {
    image.orderBy('img_url', 'DESC');
    image.limit(10);
    // if you want to include the user with the image, you would use the withRelated
    // comments.user gets the user within the comments array
  })
    .fetchAll({
      withRelated: [
        'user',
        {
          comments: (qb) => {
            qb.orderBy('created_at', 'ASC');
          },
        },
        'comments.user',
        'likes',
      ],
    })
    .then(images => res.status(200).json(images.toJSON()));
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  Image.forge({ id })
    .fetch()
    .then(image => image
      .destroy()
      .then(() => res.json({ error: true, data: { message: 'Image Deleted' } }))
      .catch(err => res
        .status(500)
        .json({ error: true, data: { message: err.message } })))
    .catch(err => res
      .status(500)
      .json({ error: true, data: { message: err.message } }));
});
router.post(
  '/upload',
  multipartMiddleware,
  upload.single('ourImage'),
  (req, res) => {
    if (!req.files) {
      return res.status(500).send('Please upload a file');
    }
    //  console.log(req.files)
    cloud.uploader.upload(
      req.files.ourImage.path,
      { crop: 'fill', folder: '/uploads' },
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        // console.log(req.user)
        const img = new Image({
          img_url: result.secure_url,
          image_title: req.files.ourImage.name,
          user_id: req.user.id,
        });
        // console.log(img);
        // fetches image with user when a upload is made
        img.save().then(async () => {
          await Image.query((image) => {
            image.orderBy('img_url', 'DESC');
            image.limit(10);
          })
            .fetchAll({ withRelated: ['user', 'comments', 'likes'] })
            .then(images => res.status(200).json(images));
        });
      },
    );
  },
);
router.post('/like/:id', (req, res) => {
  const { id } = req.params;
  if (id !== null || 'undefined') {
    Image.forge({ id })
      .fetch({ withRelated: ['user', 'comments', 'likes'] })
      .then((likes) => {
        const like = likes.toJSON();
        // console.log(like.likes);
        const existingUserlikes = like.likes.map(user => user.user_id);
        // checking to see if a user already liked his own post
        // if existing user does not have user id, user can like post,
        // else if user already like this post wont be able to.

        const newLike = new Likes({
          image_id: id,
          user_id: req.user.id,
          likedByme: req.body.newHeart,
        });
        if (existingUserlikes.includes(req.user.id)) {
        // !newLike do not create a new row of likes if like from this user already exists
          if (!newLike) {
            Likes.forge().where({ user_id: req.user.id, image_id: id }).destroy();
            Likes.forge().likedByme();
          }
          return res.status(500).json({ status: 'You already liked this post', like: newLike });
        }
        newLike.save().then(like => res.status(200).json({ status: 'You liked this post', like: newLike }));
      });
  }
});
router.post('/newComment', async (req, res) => {
  const myComment = new Comment({
    comment_body: req.body.commentBody, // remember commentBody is used for the client side
    user_id: req.user.id,
    image_id: req.body.id,
  });
  console.log(req.body);
  myComment.save().then(async (comment) => {
    await Comment.query((comment) => {
      comment.orderBy('created_at', 'DESC'); // importan line of code for accuate comment structure
    })
      .fetchAll({ withRelated: ['user'] })
      .then(comments => res.status(200).json(comments));
  });
});
export default router;
