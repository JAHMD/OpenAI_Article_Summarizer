import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
	return (
		<>
			<div className="main" aria-hidden="true">
				<div className="gradient" />
			</div>
			<div className="app">
				<Header />
				<Main />
			</div>
		</>
	);
}

export default App;
