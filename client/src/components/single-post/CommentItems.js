import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/posts';

const CommentItems = ({
  postId,
  auth,
  comment: { userid, avatar, name, text, _id, date }
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profiles/${userid}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </p>
        {!auth.loading && auth.user._id === userid && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={e => deleteComment(postId, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItems.propTypes = {
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
};

const mapDispatchToProps = state => ({
  auth: state.auth
});

export default connect(mapDispatchToProps, { deleteComment })(CommentItems);
