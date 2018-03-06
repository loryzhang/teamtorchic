const db = require('./postgreSql');

module.exports = {
  get: async (dishid) => {
    console.log('getDishlikes')
    const dishlikes = {
      text: 'select * from posts inner join dishes on dishes.id = posts.dishId where dishes.id = $1',
      values: [dishid],
    };
    try {
      const results = await db.client.query(dishlikes);
      return results;
    } catch (e) {
      throw e;
    }
  },
  upVote: async (dishid, likesdish, userid, restaurantid) => {
    const checkVote = {
      text: 'select likesdish, id from posts where userid = $1 and dishid = $2',
      values: [userid, dishid],
      rowMode: 'array',
    };
    const insertVote = {
      text: 'insert into posts (likesdish, userid, dishid, restaurantid) values ($1, $2, $3, $4)',
      values: [likesdish, userid, dishid, restaurantid],
    };
    try {
      const votes = await db.client.query(checkVote);
      if (votes.rowCount) {
        let islike = votes.rows[0][0];
        const targetpost = votes.rows[0][1];
        if (islike) {
          islike = null;
        } else {
          islike = 1;
        }
        const updateUpVote = {
          text: 'update posts set likesdish = $1 where id = $2',
          values: [islike, targetpost],
        };
        try {
          return await db.client.query(updateUpVote);
        } catch (e) {
          throw e;
        }
      }
      try {
        return await db.client.query(insertVote);
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
  downVote: async (dishid, likesdish, userid, restaurantid) => {
    console.log('haha');
    const checkVote = {
      text: 'select likesdish, id from posts where userid = $1 and dishid = $2',
      values: [userid, dishid],
      rowMode: 'array',
    };
    const insertVote = {
      text: 'insert into posts (likesdish, userid, dishid, restaurantid) values ($1, $2, $3, $4)',
      values: [likesdish, userid, dishid, restaurantid],
    };
    try {
      const votes = await db.client.query(checkVote);
      if (votes.rowCount) {
        let islike = votes.rows[0][0];
        const targetpost = votes.rows[0][1];
        if (!islike) {
          islike = null;
        } else {
          islike = 0;
        }
        const updateDownVote = {
          text: 'update posts set likesdish = $1 where id = $2',
          values: [islike, targetpost],
        };
        try {
          return await db.client.query(updateDownVote);
        } catch (e) {
          throw e;
        }
      }
      try {
        return await db.client.query(insertVote);
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
};
