import React from "react";
import { css } from "emotion";

const postStyle = css({
  flexShrink: 0,
  flexGrow: 1,
  flexBasis: "20vw",
  padding: "20px"
});

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;
    return (
      <div className={postStyle}>
        <img
          src={(post.images && post.images[0].link) || post.link}
          alt={post.title}
          height="100"
        />
        <p>{post.title}</p>
        <p>Comments: {post.comment_count}</p>
      </div>
    );
  }
}

export default Post;
