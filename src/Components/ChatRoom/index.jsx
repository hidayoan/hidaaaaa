import { SendOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../ChatMessage";

function ChatRoom(props) {
	const { firestore, auth, firebase, chatName } = props;
	const dummy = useRef();

	const messagesRef = firestore
		.collection("messages")
		.doc(chatName.id)
		.collection("Chat1");
	const query = messagesRef.orderBy("createAt").limit(25);

	const [values] = useCollectionData(query, { idField: "id" });
	const [formValue, setFormValue] = useState("");

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [values]);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (formValue !== "") {
			const { uid, photoURL } = auth.currentUser;
			await messagesRef.add({
				text: formValue,
				createAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid,
				photoURL,
				displayName: auth.currentUser.displayName,
			});

			setFormValue("");
		}
	};

	return (
		<>
			<div className="messages__listItems">
				{values &&
					values.map((msg) => (
						<ChatMessage auth={auth} key={msg.id} message={msg} />
					))}
				<div ref={dummy}></div>
			</div>

			<form className="messages__form" onSubmit={sendMessage}>
				<div className="messages__formContainer">
					<input
						className="messages__input"
						value={formValue}
						onChange={useCallback((e) => setFormValue(e.target.value), [])}
					/>
					<button type="submit">
						<SendOutlined
							style={{ paddingLeft: "2px" }}
							className="messages__btn"
						/>
					</button>
				</div>
			</form>
		</>
	);
}

export default ChatRoom;
