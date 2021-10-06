import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Cart/Review/Review.js';
import Inventory from './components/Inventory/Inventory.js';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();
function App() {

	const [loggedInUser, setLoggedInUser] = useState({})

	const NoMatch = () => {
		let location = useLocation();

		return (
			<div>
				<h3>No Match For <code>{location.pathname}</code></h3>
			</div>
		)
	};

	return (
		<UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
			{console.log(loggedInUser)}
			<Router>
				<Header></Header>

				<Switch>

					<Route exact path="/">
						<Shop></Shop>
					</Route>

					<Route path="/shop">
						<Shop></Shop>
					</Route>

					<Route path="/review">
						<Review></Review>
					</Route>

					<PrivateRoute path="/manage-inverntory">
						<Inventory></Inventory>
					</PrivateRoute>

					<Route path="/login">
						<Login></Login>
					</Route>

					<PrivateRoute path="/shipment">
						<Shipment></Shipment>
					</PrivateRoute>

					<Route path="/product/:productKey">
						<ProductDetail></ProductDetail>
					</Route>

					<Route path="*">
						<NoMatch></NoMatch>
					</Route>


				</Switch>

			</Router>
		</UserContext.Provider>
	);
}



export default App;
