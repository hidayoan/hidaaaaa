import { CommentOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import React, { useCallback, useState } from "react";

function CreateGroupChat(props) {
	const { firestore, auth, firebase } = props;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [formValue, setFormValue] = useState("");

	const groupRef = firestore.collection("messages");

	const createGroup = async (e) => {
		e.preventDefault();
		if (formValue !== "") {
			const { uid, photoURL } = auth.currentUser;
			await groupRef.add({
				avatarGroup: photoURL,
				createAt: firebase.firestore.FieldValue.serverTimestamp(),
				createBy: uid,
				member: [uid],
				name: formValue,
			});
			setFormValue("");
		}
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<>
			<div className="CreateGroupChat" onClick={showModal}>
				<CommentOutlined />
				New Group
			</div>
			<Modal
				theme="dark"
				title="Create Group"
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<form className="createGroupChat__form" onSubmit={createGroup}>
					<input
						type="text"
						placeholder="GroupName"
						onChange={useCallback((e) => setFormValue(e.target.value), [])}
					/>
					<button type="submit">Confirm</button>
				</form>
			</Modal>
		</>
	);
}

export default CreateGroupChat;
