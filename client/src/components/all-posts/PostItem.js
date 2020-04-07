import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { likePost, unlikePost, deletePost } from '../../actions/posts';

const PostItem = ({
  showActions,
  likePost,
  unlikePost,
  deletePost,
  auth,
  post: { _id, text, name, avatar, userid, likes, comments, date }
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${userid}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>
      <button
        onClick={e => likePost(_id)}
        type='button'
        className='btn btn-light'
      >
        <i className='fas fa-thumbs-up'></i>{' '}
        <span>{likes.length > 0 && likes.length}</span>
      </button>
      <button
        onClick={e => unlikePost(_id)}
        type='button'
        className='btn btn-light'
      >
        <i className='fas fa-thumbs-down'></i>
      </button>
      {showActions && (
        <Fragment>
          <Link to={`/post/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {userid === auth.user._id && (
            <button
              onClick={e => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapDispatchToProps = state => ({
  auth: state.auth
});

export default connect(mapDispatchToProps, {
  likePost,
  unlikePost,
  deletePost
})(PostItem);
