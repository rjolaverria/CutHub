import {
  GET_ALL_POSTS,
  GET_POST,
  CREATE_POST,
  POST_ERROR,
  UPDATE_LIKES,
  CLEAR_POST,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../utils/constants';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: data,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: data,
        loading: false
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [data, ...state.posts],
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === data.id ? { ...post, likes: data.like } : post
        ),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        errors: data,
        loading: false
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== data),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: data },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== data)
        },
        loading: false
      };
    default:
      return state;
  }
}
