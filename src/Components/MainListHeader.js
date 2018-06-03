import styled, { css } from "react-emotion";
import React from "react";
import Option from "muicss/lib/react/option";
import Select from "muicss/lib/react/select";

const header = css({
	position: "fixed",
	top: 0,
	width: "100%",
	padding: "0 4em",
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
		return (
			<div className={header}>
				<NavStyles>
					<li>
						<div className="mui-select">
							<Select
								label="Section"
								onChange={i => {
									this.props.handleChange({
										page: 1,
										section: i.target.value
									});
								}}
							>
								<Option value="hot" label="Hot" />
								<Option value="top" label="Top" />
								<Option value="user" label="User" />
							</Select>
						</div>
					</li>
					<li>
						<div className="mui-select">
							<Select
								label="Sort"
								onChange={i => {
									this.props.handleChange({
										page: 1,
										sort: i.target.value
									});
								}}
							>
								<Option value="top" label="Top" />
								<Option value="viral" label="Viral" />
								<Option value="time" label="Time" />
							</Select>
						</div>
					</li>
					<li>
						<div className="mui-select">
							{" "}
							<Select
								label="Window"
								onChange={i => {
									this.props.handleChange({
										page: 1,
										__window: i.target.value
									});
								}}
							>
								<Option value="day" label="Day" />
								<Option value="top" label="Week" />
								<Option value="month" label="Month" />
								<Option value="year" label="Year" />
								<Option value="all" label="All" />
							</Select>
						</div>
					</li>
				</NavStyles>
			</div>
		);
	}
}

export default Header;
