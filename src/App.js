import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation} from "react-router-dom"
import "./App.css"
import { useCallback } from "react"
import { BootApp } from "./pages/boot"
import { Desktop } from "./pages/desktop"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const handleLogin = (username) => {
	  setIsLoggedIn(true);
	}

	const handleLogout = () => {
		setIsLoggedIn(false)
	};
	

	return (
		<>
			<div className='background'>
				<div className='App'>
					<Router>
						<Routes>
							<Route path="/" 
								element={<Navigate 
								to={isLoggedIn ? "/dekstop" : "/boot"} />} />
								<Route path="/boot" 
									  element={<BootApp onLogin={handleLogin} />} />
							<Route path="/desktop" 
								element={<Desktop/>} />
						</Routes>
					</Router>
				</div>
			</div>
		</>
	)
}

export default App
