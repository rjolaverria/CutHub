import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/posts';

const Posts = ({ getAllPosts, auth, posts: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the CutHub community!
          </p>
          <PostForm />
          <div className='posts'>
            {posts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapDispatchToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapDispatchToProps, { getAllPosts })(Posts);
