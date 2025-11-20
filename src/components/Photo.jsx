import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Photo.css';

const Photo = ({ id, src, timestamp, isNew, onSelect, isSelected, initialPos, filterStyle = {}, onDevelop }) => {
  const [developed, setDeveloped] = useState(!isNew);

  useEffect(() => {
    if (isNew) {
      // Simulate developing process
      const timer = setTimeout(() => {
        setDeveloped(true);
        if (onDevelop) onDevelop(id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isNew, onDevelop, id]);

  // Construct filter string
  const getFilterString = () => {
    if (!developed) return 'blur(10px) brightness(2) grayscale(1)';
    
    const { 
      brightness = 100, 
      contrast = 100, 
      blur = 0, 
      saturate = 100, 
      sepia = 0, 
      grayscale = 0, 
      hueRotate = 0 
    } = filterStyle;

    return `
      brightness(${brightness}%) 
      contrast(${contrast}%) 
      blur(${blur}px) 
      saturate(${saturate}%) 
      sepia(${sepia}%) 
      grayscale(${grayscale}%) 
      hue-rotate(${hueRotate}deg)
    `;
  };

  return (
    <motion.div
      id={`photo-${id}`}
      className={`polaroid-wrapper ${isSelected ? 'selected' : ''}`}
      // Dragging logic
      drag
      dragMomentum={false}
      // Animation for new photos
      initial={isNew ? { x: initialPos.x, y: initialPos.y + 50, scale: 0.2, opacity: 0 } : false}
      animate={isNew ? { y: initialPos.y - 250, opacity: 1, scale: 1 } : { scale: isSelected ? 1.05 : 1, zIndex: isSelected ? 100 : 10 }}
      transition={{ duration: 3, type: "spring", stiffness: 50 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <div className="polaroid-card">
        <div className="photo-area">
           <div 
             className="photo-img" 
             style={{ 
               backgroundImage: `url(${src})`,
               filter: getFilterString()
             }}
           ></div>
           <div className="photo-overlay" style={{ opacity: developed ? 0 : 1 }}></div>
        </div>
        <div className="caption-area">
          <p className="handwritten-text">{timestamp}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Photo;

