import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '../../components/ui/label';
import styles from './boot.module.css';

export const BootApp = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        handleTransition();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000); // Matches the duration of the slide-up animation
  };

  return (
    <div
      className={`${styles.bodyBackground} ${isTransitioning ? styles.slideUp : ''}`}
      onClick={handleTransition}
    >
      <Label className={styles.currentTime}>{currentTime}</Label>
      <Label className={styles.currentDate}>{currentDate}</Label>
    </div>
  );
};
