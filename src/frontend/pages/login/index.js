import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import welcomeAudio from '../../assets/img/welcomehoney.wav';
import backgroundImage from '../../assets/img/before_login_bg_2.png'

function WelcomePage() {
    const navigate = useNavigate();  
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Set a timeout to navigate to another page after a few seconds
        const timeout = setTimeout(() => {
            setVisible(false);
            navigate('/desktop');
        }, 2000); // Adjust the time (in milliseconds) as needed

        // Cleanup function to clear the timeout on component unmount
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
      <div style={{       
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '2rem',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
       }}>
            {/* Welcome page content */}
            <h3 style={{ color: 'black' }}>Welcome, Honey!</h3>

            {/* Audio element */}
            <audio autoPlay>
                <source src={welcomeAudio} type="audio/wav" />
            </audio>
        </div>
    );
}

export default WelcomePage;