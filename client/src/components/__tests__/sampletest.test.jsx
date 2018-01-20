import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import Submit from 'Submit';
import Posts from 'Posts';
import Post from 'Post';
import Comment from 'Comment';
import Header from 'Header';
import Login from 'Login';
import Signup from 'Signup';
import Search from 'Search';
import Suggestions from 'Suggestions';

describe('App', () => {
  it('renders app without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    });
});