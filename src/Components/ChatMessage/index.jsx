import React from "react";

function ChatMessage(props) {
	const { auth } = props;
	const { text, uid, photoURL, displayName, createAt } = props.message;
	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
	// const hours = createAt.toDate().getHours();
	// const minutes = createAt.toDate().getMinutes();

	return (
		<>
			{messageClass === "sent" && createAt !== null && (
				<>
					<div className={`messages__item messages__${messageClass}`}>
						<div className="messages__box">
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div className="messages__name">you</div>
								<div>
									{/* {hours}:{minutes} */}
									{createAt.toDate().getHours()}:
									{createAt.toDate().getMinutes()}
								</div>
							</div>
							<p>{text}</p>
						</div>
					</div>
				</>
			)}
			{messageClass === "received" && createAt !== null && (
				<>
					<div className={`messages__item messages__${messageClass}`}>
						<img src={photoURL} alt="" />
						<div className="messages__box">
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div className="messages__name">{displayName}</div>
								<div></div>
							</div>
							<p>{text}</p>
						</div>
					</div>
				</>
			)}
		</>
	);

	// <div className={`message ${messageClass}`}>
	// 	<img src={photoURL} alt="" />
	// 	<p>{text}</p>
	// </div>
}
export default ChatMessage;
