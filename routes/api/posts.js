const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifytoken');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route    POST api/posts
// @desc     Create a Post
// @access   Private
router.post(
  '/',
  [
    verifyToken,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        userid: user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all Posts
// @access   Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:post_id
// @desc     Get Post by ID
// @access   Private
router.get('/:post_id', verifyToken, async (req, res) => {
  //Post
  const postId = req.params.post_id;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:post_id
// @desc     DELETE Post by ID
// @access   Private
router.delete('/:post_id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.userid.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    await post.remove();
    res.json({ msg: 'Post deleted' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error');
  }
});

//LIKES ROUTES

// @route    PUT api/posts/like/:post_id
// @desc     Like a post
// @access   Private
router.put('/like/:post_id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Check if owner of post
    if (post.userid.toString() === req.user.id) {
      return res.status(401).json({ msg: 'Cannot like your own post' });
    }

    //User already liked post?
    if (
      post.likes.filter(like => like.userid.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ userid: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:post_id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:post_id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Check if owner of post
    if (post.userid.toString() === req.user.id) {
      return res.status(401).json({ msg: 'Cannot unlike on your own post' });
    }

    //User already liked post?
    if (
      post.likes.filter(like => like.userid.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post not liked' });
    }

    //Remove index
    const index = post.likes
      .map(like => like.userid.toString())
      .indexOf(req.user.id);

    post.likes.splice(index, 1);
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error');
  }
});

//COMMENTS ROUTES

// @route    POST api/posts/:post_id/comments
// @desc     Comment on a Post
// @access   Private
router.post(
  '/:post_id/comments',
  [
    verifyToken,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        userid: user.id
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/:post_id/comments/:comment_id
// @desc     Delete a comment
// @access   Private
router.delete(
  '/:post_id/comments/:comment_id',
  verifyToken,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      if (post.comments.length === 0) {
        return res.status(404).json({ msg: 'Post has no comments' });
      }

      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );

      console.log(comment);
      //Check if comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      //Check user
      if (comment.userid.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      //Remove index
      const index = post.comments
        .map(comment => comment.id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(index, 1);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId')
        return res.status(404).json({ msg: 'Post not found' });
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
