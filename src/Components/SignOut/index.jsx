import React from "react";

function SignOut({ auth }) {
	return (
		auth.currentUser && (
			<button className="header__btn" onClick={() => auth.signOut()}>
				Sign Out
			</button>
		)
	);
}
export default SignOut;
