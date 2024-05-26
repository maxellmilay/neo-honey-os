import React, { useState, useEffect } from 'react'
import Notepad from '../../components/notepad/Notepad';
import PCB from '../../components/pcb';
import { Link } from "react-router-dom";
import {
  HomeIcon,
  LogOut
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import styles from './desktop.module.css'
import { VoiceRecog } from '../../components/voiceRecog';
import beeLogo from '../../assets/img/bee.png';
import buzzpadLogo from '../../assets/img/buzzpad.png';

export const Desktop = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleExit = () => {
    window.close(); // Close the window to exit the app
  };

  return (
    <>
      <div className={`${styles.taskbar} flex items-center justify-between fixed bottom-0 w-full h-16 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg p-4`}>
        <div className="flex items-center space-x-4">
          <Button variant="link" size="icon">
            <Link to="/boot">
              <HomeIcon className="h-7 w-7 text-yellow-200 hover:text-gray-300" />
            </Link>
          </Button>
          <Button variant="link" size="icon">
            <Link to="/PCB">
              <img src={beeLogo} alt="PCB" className="h-10 w-10" />
            </Link>
          </Button>
          <Button variant="link" size="icon">
            <img src={buzzpadLogo} alt="Notepad" className="h-7 w-7" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-yellow-200 text-lg ">{currentTime}</span>
          <Button variant="link" size="icon">
            <VoiceRecog />
          </Button>
        </div>
      </div>
      <div className="fixed bottom-8 right-5">
        <Button variant="link" size="icon" onClick={handleExit}>
          <LogOut className="h-5 w-5 text-yellow-800 hover:text-yellow-950" />
        </Button>
      </div>
      <Notepad />
      <PCB />
    </>
  )
}