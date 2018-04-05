import { FETCH_POSTS } from '../constants';

const fetchPosts = posts => ({ type: FETCH_POSTS, payload: posts });

export default fetchPosts;
