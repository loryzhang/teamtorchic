import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Submit from './components/submit.jsx';
import Posts from './components/posts.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      id: null,
      posts: [],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changeView = this.changeView.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const hasSession = await axios('/session');
      if (hasSession.data) {
        const { user, id } = hasSession.data;
        const prevUser = await axios('/posts');
        // console.log('prev', prevUser.data);
        const posts = prevUser.data;
        this.setState({
          user,
          id,
          posts,
        });
      } else {
        const homepage = await axios('/home');
        const posts = homepage.data;
        this.setState({
          posts,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleLogin(user) {
    this.setState({ user });
  }

  async handleLogout() {
    try {
      await axios('/logout');
      this.setState({
        user: null,
        id: null,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async handleSearch(searchTerm, value) {
    if (searchTerm === 'rating') {
      try {
        const posts = await axios('/rating');
        this.setState({
          posts: posts.data,
        });
      } catch (e) {
        console.log(e);
      }
    } else if (value === '') {
      return;
    } else {
      try {
        const posts = await axios(`/search/${searchTerm}/${value}`);
        this.setState({
          posts: posts.data
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  changeView() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <Header
          user={this.state.user}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
        />
        {this.state.user &&
        <Submit
          user={this.state.user}
          id={this.state.id}
        />}
        <Posts
          user={this.state.user}
          changeView={this.changeView}
          id={this.state.id}
          posts={this.state.posts}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
