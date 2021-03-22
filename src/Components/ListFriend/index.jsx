import { Menu } from "antd";
import React from "react";

function ListFriend(props) {
	const { friends } = props;

	return (
		<>
			{friends &&
				friends[0] !== null &&
				friends[0].friendList.map((value) => (
					<Menu.Item {...props} key={value.uid} className="friendList">
						<img src={value.photoUrl} className="friendList__photo" alt="" />
						<div className="friendList__name"> {value.displayName}</div>
					</Menu.Item>
				))}
		</>
	);
}

export default ListFriend;
