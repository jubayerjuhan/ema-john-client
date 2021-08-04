import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App.js";
import { createUserWithEmailPassword, handleGoogleSignIn, handleGoogleSignOut, initializeLoginFramework, signInUserWithEmailAndPassword } from "./LoginManager";


const Login = () => {
	initializeLoginFramework();

	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const history = useHistory();
	const location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } }

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

	const [newUser, setNewUser] = useState(false)

	const googleSignIn = () => {
		handleGoogleSignIn()
			.then((res) => {
				handleResponse(res, true)
			})
	}

	const googleSignOut = () => {
		handleGoogleSignOut()
			.then((res) => handleResponse(res, false))
	}

	const handleResponse = (res, redirect) => {
		setUser(res);
		setLoggedInUser(res);
		redirect && history.push(from)
	}


	const handleSubmit = (e) => {
		console.log(user.name, user.email, user.password);
		if (newUser && user.email && user.password) {
			createUserWithEmailPassword(user.name, user.email, user.password)
				.then((res) => {
					handleResponse(res, true)
				})
		}
		console.log(user);
		console.log(user.name, user.email, user.password);
		if (!newUser && user.email && user.password) {
			console.log('Logging In...');
			signInUserWithEmailAndPassword(user.email, user.password)
				.then((res) => {
					handleResponse(res, true)
				})
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
	}


	return (
		<div style={{ textAlign: 'center' }}>

			{user.isSignedIn ?
				<button onClick={googleSignOut}>Sign Out With Google</button> :
				<button onClick={googleSignIn}>Sign In With Google</button>
			}
			<br />

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