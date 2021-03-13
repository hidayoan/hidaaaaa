import "antd/dist/antd.css";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatRoom from "./Components/ChatRoom";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";
import "./index.scss";

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: "AIzaSyCJEGthJSxf7NSSleSiCei9lUzBHftQPR4",
		authDomain: "chat-app-b418f.firebaseapp.com",
		projectId: "chat-app-b418f",
		storageBucket: "chat-app-b418f.appspot.com",
		messagingSenderId: "686085869746",
		appId: "1:686085869746:web:8ea4c6acaed974c8ebb9ab",
		measurementId: "G-4YYBJY9PYB",
	});
} else {
	firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createAt").limit(25);

	const [user] = useAuthState(auth);
	const [values] = useCollectionData(query, { idField: "id" });
	const [chatName, setChatName] = useState(null);

	const getChatName = (id) => {
		const a = values.filter((value) => value.id === id);
		setChatName(a[0]);
	};

	return (
		<div className="app">
			{user ? (
				<Layout>
					<Sider>
						<div className="navbar" style={{ height: "100vh" }}>
							<div className="chatName">
								{values &&
									values
										.filter((value) =>
											value.member.find((e) => e === auth.currentUser.uid)
										)
										.map((value) => (
											<div
												className={`chatName__item `}
												key={value.id}
												onClick={() => getChatName(value.id)}
											>
												<img src={value.avatarGroup} alt="" />
												<div className="chatName__group">
													<div className="chatName__name">{value.name}</div>
													<div className="chatName__member">{value.name}</div>
												</div>
											</div>
										))}
							</div>
							<SignOut auth={auth} />
						</div>
					</Sider>
					<Content
						style={{
							backgroundColor: "#36393f",
						}}
					>
						<div style={{ position: "relative" }}>
							<Header
								className="header"
								style={{
									zindex: 1,
								}}
							>
								<div className="header__container">
									<div className="header__name">
										{chatName ? chatName.name : "Chưa Có"}
									</div>
								</div>
							</Header>
							<section className="messages">
								{chatName ? (
									<div>
										<ChatRoom
											chatName={chatName}
											auth={auth}
											firestore={firestore}
											firebase={firebase}
										/>
									</div>
								) : (
									<div>chọn box chat</div>
								)}
							</section>
						</div>
					</Content>
				</Layout>
			) : (
				<SignIn auth={auth} firebase={firebase} />
			)}
		</div>
	);
}

export default App;
