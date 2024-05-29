// app.js
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation} from "react-router-dom"
import CustomCursor from './CustomCursor';
import "./App.css"
import { useCallback } from "react"
import { Desktop } from "./frontend/pages/desktop"
import { BootApp } from "./frontend/pages/boot"
import WelcomePage from './frontend/pages/login'; 
import PCB from './frontend/pages/pcb';
import { ShutDown } from "./frontend/pages/shutdown"

function App() {
	
	return (
		<>
			{/* <div className='background'> */}
				<div className='App '>
					<Router>
					<CustomCursor />
						<Routes>
							<Route path="/" 
								element={<Navigate 
								to={"/boot"} />} />
							<Route path="/boot" 
									element={<BootApp />} />
							<Route path="/login" 
								element={<WelcomePage/>} />
							<Route path="/desktop" 
								element={<Desktop/>} />
							<Route path="/PCB"
								element={<PCB/>} />
							<Route path="/shutdown" 
								element={<ShutDown />} />
						</Routes>
					</Router>
				</div>
			{/* </div> */}
		</>
	)
}

export default App
