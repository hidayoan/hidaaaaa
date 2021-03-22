import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useCallback, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function AddFriend(props) {
	const { firestore, auth, firebase } = props;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [formValue, setFormValue] = useState("");

	const listUserRef = firestore.collection("users");
	const [listUser] = useCollectionData(listUserRef, { idField: "id" });
	const [searchList, setSearchList] = useState(null);
	const searchFriend = async (e) => {
		e.preventDefault();
		if (formValue !== "") {
			const clone = [...listUser];
			const needleRegExp = new RegExp(
				formValue.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
				"i"
			);
			const c1 = clone.filter((item) => needleRegExp.test(item.displayName));
			setSearchList(c1);
			console.log(c1);
		} else {
		}
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<Button type="primary" danger onClick={showModal}>
				Add Friend
			</Button>
			<Modal
				title="Add Friend"
				visible={isModalVisible}
				footer={null}
				onCancel={handleCancel}
			>
				<form onSubmit={searchFriend}>
					<input
						type="text"
						placeholder="Search"
						onChange={useCallback((e) => setFormValue(e.target.value), [])}
					/>

					<Button type="primary" htmlType="submit">
						Confirm
					</Button>
				</form>

				{searchList &&
					searchList.map((user) => <div key={user.id}>{user.displayName}</div>)}
			</Modal>
		</>
	);
}

export default AddFriend;
