import React from 'react';
import $ from 'jquery';

import Post from './post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      posts: props.posts,
      id: props.id,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.getPostsData = this.getPostsData.bind(this);
    this.postUpvote = this.postUpvote.bind(this);
    this.postDownvote = this.postDownvote.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        posts: nextProps.posts,
      });
    }
  }

  getPostsData() {
    if (this.state.user) {
      $.get({
        url: `/${this.state.user}`,
        success: (data) => {
          this.setState({
            posts: data,
          });
        },
        err: (err) => {
          console.log(err);
        },
      });
    } else {
      $.ajax({
        method: 'GET',
        url: '/posts',
        dataType: 'json',
        success: (data) => { this.setState(this.state.posts = data); },
      });
    }
  }

  postUpvote(info, otherid) {
    $.ajax({
      method: 'POST',
      dataType: 'json',
      headers: this.state.headers,
      url: '/votes/upvote',
      data: {
        'dishId': info.postData.dishid,
        'likesDish': 1,
        'userId': otherid,
        'restaurantId': info.postData.restaurantid,
      },
      success: () => {
        this.getPostsData();
        console.log('upvote success: ', otherid);
      },
      error: () => { console.log('MISH IS MY BEST FRIEND'); },
    });
  }

  postDownvote(info, otherid) {
    $.ajax({
      method: 'POST',
      dataType: 'json',
      url: '/votes/downvote',
      headers: this.state.headers,
      data: {
        'dishId': info.postData.dishid,
        'likesDish': 0,
        'userId': otherid,
        'restaurantId': info.postData.restaurantid,
      },
      success: () => {
        this.getPostsData();
        console.log('downvote success: ', otherid);
      },
      error: () => { console.log('LORY IS MY BEST FRIEND'); },
    });
  }

  handleClick(event, likes) {
    if (likes === 'like' && this.props.user) {
      console.log('event: ', event, 'likes: ', likes, 'user', this.props.id);
      this.postUpvote(event, this.props.id);
    } else if (likes === 'dislike' && this.props.user) {
      console.log('event: ', event, 'likes: ', likes);
      this.postDownvote(event, this.props.id);
    }
  }


  render() {
    console.log('user: ', this.props.user);
    return (
      <div>
        { this.state.posts.map(item =>
          (<Post
            postId={item.id}
            key={item.id}
            postData={item}
            postImage={item.image}
            postContent={item.content}
            postUserid={item.username}
            loggedUser={this.props.user}
            postDish={item.dishname}
            votesPos={item.votes.upvote}
            votesNeg={item.votes.downvote}
            clickyclick={this.handleClick}
            likeylike={item.likesdish}
          />))}
      </div>
    );
  }
}

export default Posts;
