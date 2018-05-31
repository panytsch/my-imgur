import React from "react";
import { css } from "emotion";
import {
	Card,
	CardBody,
	Button,
	CardTitle,
	CardText,
	CardImg
} from "reactstrap";

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
		const img = `https://i.imgur.com/${post.id}.jpg`;
		return (
			<div className={postStyle}>
				<Card>
					<CardImg
						top
						width="100%"
						src={
							(post.images &&
								(post.images[0].type === "video/mp4"
									? img
									: post.images[0].link)) ||
							(post.type === "video/mp4" && img) ||
							post.link
						}
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
			</div>
		);
		// return (
		// 	<div className={postStyle}>
		// 		<img
		// 			src={
		// 				(post.images &&
		// 					(post.images[0].type === "video/mp4"
		// 						? img
		// 						: post.images[0].link)) ||
		// 				(post.type === "video/mp4" && img) ||
		// 				post.link
		// 			}
		// 			alt={post.title}
		// 			height="100"
		// 		/>
		// 		<p>{post.title}</p>
		// 		<p>Comments: {post.comment_count}</p>
		// 	</div>
		// );
	}
}

export default Post;
