const db = require('./postgreSql');

module.exports = {
  findByUsername: (username) => {
    const findUser = {
      text: 'select username from users where username = $1',
      values: [username],
    };
    return db.client.query(findUser);
  },
  create: (username, password) => {
    const createUser = {
      text: 'insert into users (username, password) values ($1, $2)',
      values: [username, password],
    };
    return db.client.query(createUser);
  },
  checkUserCredential: (username, password) => {
    const checkCredential = {
      text: 'select username from users where username = $1 and password = $2',
      values: [username, password],
    };
    return db.client.query(checkCredential);
  },
  getProfile: (username) => {
    const getUserInfo = {
      text: 'select * from users where username = $1',
      value: [username],
    };
    return db.client.query(getUserInfo);
  },
  getUserId: (username) => {
    const getUserId = {
      text: 'select id from users where username = $1',
      values: [username],
    };
    return db.client.query(getUserId);
  },
};
