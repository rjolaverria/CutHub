import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import PostItem from '../all-posts/PostItem';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/posts';
import CommentForm from './CommentForm';
import CommentItems from './CommentItems';

const Post = ({ match, getPost, posts: { loading, post } }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment, index) => (
          <CommentItems key={index} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};
const mapDispatchToProps = state => ({
  posts: state.posts
});
export default connect(mapDispatchToProps, { getPost })(Post);
