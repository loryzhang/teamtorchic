import React from 'react';
import axios from 'axios';
import Post from './post.jsx';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      posts: this.props.posts,
      id: this.props.id,
    };

    this.handleClick = this.handleClick.bind(this);
    this.postUpvote = this.postUpvote.bind(this);
    this.postDownvote = this.postDownvote.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        posts: nextProps.posts,
        user: nextProps.user,
        id: nextProps.id,
      });
    }
  }

  async postUpvote(query) {
    try {
      await axios({
        method: 'post',
        contentType: 'application/json',
        url: '/votes/upvote',
        data: query,
      });
      this.props.changeView();
    } catch (e) {
      console.log(e);
    }
  }

  async postDownvote(query) {
    console.log('query', query);
    try {
      await axios({
        method: 'post',
        contentType: 'application/json',
        url: '/votes/downvote',
        data: query,
      });
      this.props.changeView();
    } catch (e) {
      console.log(e);
    }
  }

  handleClick(query, vote) {
    query.user = this.state.id;
    if (vote) {
      query.likesdish = 1;
      query.userid = this.state.id;
      this.postUpvote(query);
    } else {
      query.likesdish = 0;
      query.userid = this.state.id;
      this.postDownvote(query);
    }
  }


  render() {
    console.log('hi', this.state.posts)
    return (
      <div>
        { this.state.posts.map(post =>
          (<Post
            key={post.postid}
            user={this.state.user}
            post={post}
            handleClick={this.handleClick}
            id={this.state.id}
            currentUser={this.props.currentUser}
          />))}
      </div>
    );
  }
}

export default Posts;
