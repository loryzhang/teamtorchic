import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
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

describe('render', () => {
    it('should render the posts', () => {
        const posts = shallow(<posts user={'Lory'} id={3} />);
            // changeView={this.changeView}
            // posts={this.state.posts}
            
        const post = <div className="post-ele">
        <article className="ele">
        </article>
      </div>;
        expect(posts.contains(post)).toEqual(true);
    });
});

// describe('formatTime', () => {
//     it('should format seconds', () => {
//         const clock = shallow(<Clock/>);
//         const seconds = 635;
//         const expected = '10:35';
//         const actual = clock.instance().formatTime(seconds);

//         expect(actual).toBe(expected);
//     });

//     it('should format seconds when minutes or seconds are less than 10', () => {
//         const clock = shallow(<Clock/>);
//         const seconds = 65;
//         const expected = '01:05';
//         const actual = clock.instance().formatTime(seconds);

//         expect(actual).toBe(expected);
//     });
// });
// });
