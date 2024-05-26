import React, { useEffect } from 'react';
import shuttingDownGif from '../../assets/img/bye.png';
import shutdownSound from '../../assets/img/honeybee.mp3';

export const ShutDown = () => {
  useEffect(() => {
    const audio = new Audio(shutdownSound);
    audio.play();

    const timer = setTimeout(() => {
      window.close(); // Close the app after a short delay
    }, 5000);

    return () => {
      clearTimeout(timer); // Cleanup the timer if the component unmounts
      //audio.pause(); // Pause the audio if the component unmounts
      audio.currentTime = 0; // Reset the audio
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontSize: '2rem'
    }}>
      <img src={shuttingDownGif} alt="Buzzing Off" style={{ width: '100px', marginTop: '20px' }} />
      <h3 style={{ color: 'yellow' }}>Buzzing off...</h3>
      <audio src={shutdownSound} autoPlay /> {/* For browsers that support auto play */}
    </div>
  );
};