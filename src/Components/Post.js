import React from "react";
import { css } from "emotion";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

const postStyle = css({
	flexShrink: 1,
	flexGrow: 0,
	flexBasis: "20vw",
	margin: "20px",
	backgroundColor: "rgb(150, 232, 235)",
	borderRadius: "1%",
	border: "1px solid rgb(114, 199, 230)",
	minWidth: "200px"
});

class Post extends React.Component {
	render() {
		const { post } = this.props;
		return (
			<div className={postStyle}>
				<Link to={`/posts/${post.images[0].id}`}>
					<Card>
						<CardImg
							top
							width="100%"
							src={post.images[0].link}
							alt="Card image cap"
							style={{ maxHeight: "50vh" }}
						/>
						<CardBody>
							<CardTitle>{post.title}</CardTitle>
							<CardText>
								<small className="text-muted">
									Comments count: {post.comment_count}
								</small>
							</CardText>
						</CardBody>
					</Card>
				</Link>
			</div>
		);
	}
}

export default Post;
