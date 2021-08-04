import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../Firebase-Config.js";

export const initializeLoginFramework = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	} else {
		firebase.app(); // if already initialized, use that one
	}
}

export const handleGoogleSignIn = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	console.log('sign in clicked yey');

	return firebase.auth().signInWithPopup(provider)
		.then(res => {
			console.log(res.user);
			const { displayName, email, photoURL } = res.user;
			const signedInUser = {
				isSignedIn: true,
				name: displayName,
				photo: photoURL,
				email: email,
				success: true,
				loginSuccess: true,
			}
			return signedInUser;
		})
		.catch(error => {
			console.log(error);
			console.log(error.message);
		})
}

export const handleFacebookSignIn = () => {
	const fbProvider = new firebase.auth.FacebookAuthProvider();
	firebase
		.auth()
		.signInWithPopup(fbProvider)
		.then((result) => {
			var credential = result.credential;
			console.log(credential)
			var user = result.user;
			console.log(user)
			var accessToken = credential.accessToken;
			console.log(accessToken)
			console.log('fb user after sign in', user);
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
			console.log(errorMessage, errorCode, email, credential);

		});
}

export const handleGoogleSignOut = () => {
	return firebase.auth().signOut()
		.then((res) => {
			console.log(res);
			const signedOutUser = {
				isSignedIn: false,
				name: '',
				email: '',
				photo: '',
			}
			return signedOutUser;
		})

		.catch(error => {
			console.log(error);
		})
}


export const createUserWithEmailPassword = (name, email, password) => {
	return firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((res) => {
			// Signed in 
			// ...
			console.log(res.user);
			const newUserInfo = res.user;
			newUserInfo.errors = '';
			newUserInfo.loginSuccess = true;
			newUserInfo.success = true;
			updateUserInfo(name)
			return newUserInfo;
		})
		.catch((error) => {
			// const errorCode = error.code;
			const errorMessage = error.message;
			const newUserInfo = {};
			newUserInfo.errors = errorMessage;
			newUserInfo.loginSuccess = false;
			newUserInfo.success = false;
			return newUserInfo;
		})
}


export const signInUserWithEmailAndPassword = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			const userInfo = user;
			userInfo.loginSuccess = true;
			return userInfo;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			console.log(errorCode);
			const errorMessage = error.message;
			const userInfo = {};
			userInfo.errors = errorMessage;
			userInfo.loginSuccess = false;
			return userInfo;

		});
}

const updateUserInfo = name => {
	const user = firebase.auth().currentUser;

	user.updateProfile({
		displayName: name,
	}).then(() => {
		// Update successful
		console.log('username updated successful')
		// ...
	}).catch((error) => {
		// An error occurred
		console.log(error)
		// ...
	});
}

