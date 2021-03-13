import React from "react";

function SignIn({ firebase, auth }) {
	const SignInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};
	return (
		<div>
			<button onClick={SignInWithGoogle}>Sign In With Google</button>
		</div>
	);
}

export default SignIn;
