import React, { useState, useEffect } from 'react';
import './CustomCursor.css'; // Import CSS for styling
import customCursorImage from './cursor.gif'; // Default cursor image
import customCursorPointImage from './cursorPoint.gif'; // Pointing cursor image

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorImage, setCursorImage] = useState(customCursorImage);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.type === 'submit' || target.type === 'button' ||target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('hover')) {
        setCursorImage(customCursorPointImage);
      } else {
        setCursorImage(customCursorImage);
      }
    };

    const handleMouseLeave = () => {
      setCursorImage(customCursorImage);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ backgroundImage: `url(${cursorImage})`, left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default CustomCursor;
