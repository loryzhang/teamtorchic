import React from 'react';

const Signup = () => (
  <form action="/signup" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username" />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" />
    </div>
    <div>
      <input type="submit" value="Sign Up" />
    </div>
  </form>
);

export default Signup;
