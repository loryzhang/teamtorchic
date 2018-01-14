import React from 'react';

const Post = props => (
  <div className="post-ele">
    <article className="ele">
      <p>{props.postUserid} likes {props.postDishid}</p>
      <p><img className="image" src={props.postImage} /></p>
      <p>
        <i onClick={() => props.clickyclick('like')}
          className={"material-icons"}>
      favorite_border
        </i>
        {props.votesPos}
        <i onClick={() => props.clickyclick('dislike')}
          className="material-icons">
          mood_bad
        </i>
          {props.votesNeg}
        <span className="content-ele">{props.postContent}</span>
      </p>
    </article>
  </div>
);

export default Post;
