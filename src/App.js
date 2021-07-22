import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Cart/Review/Review.js';
import Inventory from './components/Inventory/Inventory.js';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import ProductDetail from "./components/ProductDetail/ProductDetail";
// import Lala from './components/ProductDetail/Lala.js';

function App() {

	const NoMatch = () => {
		let location = useLocation();

		return (
			<div>
				<h3>No Match For <code>{location.pathname}</code></h3>
			</div>
		)
	};

	return (
		<div className="App">
			<Header></Header>

			<Router>
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

					<Route path="/manage-inverntory">
						<Inventory></Inventory>
					</Route>

					<Route path = "/product/:productKey">
						<ProductDetail></ProductDetail>
					</Route>

					<Route path="*">
						<NoMatch></NoMatch>
					</Route>

					
				</Switch>

			</Router>
		</div>
	);
}



export default App;
