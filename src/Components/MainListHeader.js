import styled, { css } from "react-emotion";
import React from "react";

const header = css({
	position: "fixed",
	top: 0,
	width: "100%",
	padding: "1em 4em",
	margin: 0,
	backgroundColor: "rgb(205, 186, 246)"
});
const NavStyles = styled("nav")`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	${"li"} {
		list-style-type: none;
		margin: 0.25em 4em 0.25em 0em;
	}
`;
class Header extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div className={header}>
				<NavStyles>
					<li>
						Section:{" "}
						<select onChange={i => {}}>
							<option value="hot">Hot</option>
							<option value="top">Top</option>
							<option value="user">User</option>
						</select>
					</li>
					<li>
						Sort:{" "}
						<select onChange={i => {}}>
							<option value="viral">Viral</option>
							<option value="top">Top</option>
							<option value="time">Time</option>
						</select>
					</li>
					<li>
						Window:{" "}
						<select onChange={i => {}}>
							<option value="day">Day</option>
							<option value="top">Week</option>
							<option value="month">Month</option>
							<option value="year">Year</option>
							<option value="all">All</option>
						</select>
					</li>
				</NavStyles>
			</div>
		);
	}
}

export default Header;
