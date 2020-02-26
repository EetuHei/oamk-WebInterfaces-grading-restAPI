const Post = require('./Post');
const postQueries = require('./postQueries');
const multer = require('multer');
const upload = multer({ dest: '../uploads' });
const fs = require('fs');

const getPosts = async knex => {
  const getPostsData = await postQueries.getPosts();

  const posts = getPostsData;

  return posts;
};

const addImage = () => {
  postRouter.put(
    '/add-image/:id',
    addImage,
    upload.array('img', 4),
    (req, res) => {
      const images = req.files;

      images.forEach(img => {
        fs.rename(img.path, `./uploads/${img.originalname}`, err => {
          if (err) throw err;
          console.log('renamed images');
        });
      });

      images.img = images;

      images
        .save()
        .then(images =>
          res.status(200).json({
            images,
            status: 'Images added',
            success: true
          })
        )
        .catch(err => {
          console.log(err);
          res.status(401).json({
            status: 'Unauthorized',
            success: false
          });
        });
    }
  );
};

const postItem = async (
  knex,
  {
    itemOwnerId,
    title,
    description,
    category,
    city,
    country,
    images,
    price,
    date,
    delivery
  }
) => {
  const postData = await knex.transaction(async trx => {
    const postId = await postQueries.insertPost(trx, {
      itemOwnerId,
      title,
      description,
      category,
      city,
      country,
      images,
      price,
      date,
      delivery
    });

    if (!postId) {
      throw new Error('Post could not be created.');
    }

    const postData = await postQueries.getPostById(trx, postId);

    return postData;
  });

  if (!postData) {
    throw new Error('Post data could not be retrieved.');
  }

  const post = new Post(postData);

  return post;
};

module.exports = { postItem, getPosts, addImage };
