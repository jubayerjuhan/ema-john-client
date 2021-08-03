import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { UserContext } from "../../App.js";
import firebaseConfig from "../../Firebase-Config.js";
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}


const Login = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);

	const provider = new firebase.auth.GoogleAuthProvider();
	const fbProvider = new firebase.auth.FacebookAuthProvider();

	const [user, setUser] = useState({
		isSignedIn: false,
		name: '',
		email: '',
		password: '',
		errors: '',
		success: false,
		photo: '',
		loginSuccess: false,
	});
	// console.log(user);

	const [newUser, setNewUser] = useState(false)

	const handleSignin = () => {
		console.log('sign in clicked yey');
		firebase.auth().signInWithPopup(provider)
			.then(res => {
				console.log(res.user);
				const { displayName, email, photoURL } = res.user;
				const signedInUser = {
					isSignedIn: true,
					name: displayName,
					photo: photoURL,
					email: email,
				}
				setUser(signedInUser);
				setLoggedInUser(signedInUser);
			})
			.catch(error => {
				console.log(error);
				console.log(error.message);
			})
	}

	const handleSignOut = () => {
		firebase.auth().signOut()
			.then((res) => {
				console.log(res);
				const signedOutUser = {
					isSignedIn: false,
					name: '',
					email: '',
					photo: '',
				}
				setUser(signedOutUser);
			})

			.catch(error => {
				console.log(error);
			})
	}

	const handleFacebookSignIn = () => {
		firebase
			.auth()
			.signInWithPopup(fbProvider)
			.then((result) => {
				// /** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;
				console.log(credential)

				// The signed-in user info.
				var user = result.user;
				console.log(user)

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				var accessToken = credential.accessToken;
				console.log(accessToken)

				// ...
				console.log('fb user after sign in', user);
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				console.log(errorMessage, errorCode, email, credential);

				// ...
			});
	}

	// console.log(user);

	const handleSubmit = (e) => {
		console.log(user.name, user.email, user.password);
		if (newUser && user.email && user.password) {
			console.log("submitting");

			firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
				.then((res) => {
					// Signed in 
					// ...
					console.log(res.user)
					const newUserInfo = { ...user };
					newUserInfo.errors = '';
					newUserInfo.success = true;
					updateUserInfo(user.name)
					setUser(newUserInfo);
					setLoggedInUser(newUserInfo);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					const newUserInfo = { ...user };
					newUserInfo.errors = error.message;
					newUserInfo.success = false;
					setUser(newUserInfo);

					// ..
					console.log(errorCode, errorMessage);
				});
		}
		console.log(user);

		if (!newUser && user.email && user.password) {
			console.log('Logging In...');

			firebase.auth().signInWithEmailAndPassword(user.email, user.password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;

					const userInfo = { ...user }
					userInfo.loginSuccess = true;
					setUser(userInfo);
					setLoggedInUser(userInfo);
					console.log(userInfo);
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					console.log(errorCode);
					const errorMessage = error.message;

					const userInfo = { ...user };
					userInfo.errors = error.message;
					userInfo.loginSuccess = false;
					setUser(userInfo);
					console.log(errorMessage);

				});
		}
		e.preventDefault();
	}

	const handleBlur = (event) => {
		let isFieldValid = true;
		if (event.target.name === 'email') {
			isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
		}


		if (event.target.name === 'password') {
			const isPassLValid = (event.target.value).length > 3;
			const isPassHasNum = /[0-9]/g.test(event.target.value);
			const ispassValid = isPassHasNum && isPassLValid;
			isFieldValid = ispassValid;
		}
		console.log(isFieldValid)

		if (isFieldValid) {
			const newUserInfo = { ...user };
			newUserInfo[event.target.name] = event.target.value;
			setUser(newUserInfo);
		}
		// console.log(event.key)
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
	return (
		<div style={{ textAlign: 'center' }}>

			{user.isSignedIn ?
				<button onClick={handleSignOut}>Sign Out With Google</button> :
				<button onClick={handleSignin}>Sign In With Google</button>
			}
			<br />
			<button onClick={handleFacebookSignIn}>Login With Facebook</button>


			{
				user.isSignedIn &&
				<div>
					<img src={user.photo} style={{ marginTop: '20px', borderRadius: '50%' }} alt="user profile pic" />
					<h1>Welcome {user.name}</h1>
				</div>
			}

			<div>
				<h1>Hardcoded Authentication System</h1>

				<input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
				<label htmlFor="newUser">New Use Sign Up</label>	{console.log(newUser)}

				<form onSubmit={handleSubmit}>
					{newUser &&
						<>
							<input type="name" name="name" onBlur={handleBlur} placeholder="Enter Name" /> <br />
						</>
					}
					<input type="email" name="email" onBlur={handleBlur} placeholder="Enter Email" required /><br />
					<input type="password" name="password" onBlur={handleBlur} placeholder="Enter Password" required />
					<br />
					<p><small>Pass Rules: Greater Than 6 char and must have 1 num</small></p>
					<input id='submit-btn' type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
				</form>

				<p style={{ color: 'red' }}>{user.errors}</p>
				{
					user.success &&
					<p style={{ color: 'green' }}>User Created Successfully</p>
				}
				{
					user.loginSuccess &&
					<p style={{ color: 'green' }}>Logged In Successfully</p>
				}
			</div>
		</div>

	);
}

export default Login;