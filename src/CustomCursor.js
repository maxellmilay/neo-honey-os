// CustomCursor.js
import React, { useState, useEffect } from 'react';
import './CustomCursor.css'; // Import CSS for styling
import customCursorImage from './cursor.gif'; // Import custom cursor image

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      // Update trail position with a slight delay
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    document.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <>
      {/* Custom cursor image */}
      <div className="custom-cursor" style={{ backgroundImage: `url(${customCursorImage})`, left: position.x, top: position.y }}></div>
      {/* Cursor trail */}
      {/* <div className="cursor-trail" style={{ left: trailPosition.x, top: trailPosition.y }}></div> */}
    </>
  );
};

export default CustomCursor;
