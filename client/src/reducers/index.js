import { FETCH_POSTS } from '../constants';

const initialState = {
  posts: [],
  user: null,
  errorMsg: ''
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {...state, posts: [...state.posts, action.payload]}; 
  default:
    return state;
  }
};

export default rootReducer;