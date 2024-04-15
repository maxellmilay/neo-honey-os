import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation} from "react-router-dom"
import "./App.css"
import { useCallback } from "react"
import { Desktop } from "./frontend/pages/desktop"
import Login from './frontend/pages/login'; 


function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const handleLogin = () => {
	  setIsLoggedIn(true);
	}

	const handleLogout = () => {
		setIsLoggedIn(false)
	};
	

	return (
		<>
			<div className='App'>
				<Router>
					<Routes>
						<Route path="/" 
							element={<Navigate 
							to={isLoggedIn ? "/desktop" : "/login "} />} />
						<Route path="/login" 
								element={<Login onLogin={handleLogin} />} />
						<Route path="/desktop" 
							element={<Desktop/>} />
					</Routes>
				</Router>
			</div>
		</>
	)
}

export default App
