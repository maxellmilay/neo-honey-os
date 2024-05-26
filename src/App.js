// app.js
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation} from "react-router-dom"
import "./App.css"
import { useCallback } from "react"
import { Desktop } from "./frontend/pages/desktop"
import { BootApp } from "./frontend/pages/boot"
import Login from './frontend/pages/login'; 
import PCB from './frontend/pages/pcb';


function App() {
	
	return (
		<>
			{/* <div className='background'> */}
				<div className='App'>
					<Router>
						<Routes>
							<Route path="/" 
								element={<Navigate 
								to={"/boot"} />} />
							<Route path="/boot" 
									element={<BootApp />} />
							<Route path="/login" 
								element={<Login/>} />
							<Route path="/desktop" 
								element={<Desktop/>} />
							<Route path="/PCB"
								element={<PCB/>} />
						</Routes>
					</Router>
				</div>
			{/* </div> */}
		</>
	)
}

export default App
