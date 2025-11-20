import React, { useState, useRef } from 'react';
import Camera from './components/Camera';
import Photo from './components/Photo';
import Editor from './components/Editor';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  
  const handleCapture = (imageSrc) => {
    const newPhoto = {
      id: Date.now(),
      src: imageSrc,
      timestamp: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', month: '2-digit', day: '2-digit' 
      }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isNew: true,
      initialX: 125, // Center of camera (50 + 200) - Half photo width (125) = 125
      initialY: window.innerHeight - 430, // Top of camera (bottom 50 + height 380)
      style: {} // Filter styles
    };
    setPhotos((prev) => [...prev, newPhoto]);
    // Auto-select new photo after animation? Maybe not, let user pick.
  };

  const handleSelectPhoto = (id) => {
    setSelectedPhotoId(id);
  };

  const handleUpdatePhoto = (id, updates) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };
  
  const handleDevelop = (id) => {
    handleUpdatePhoto(id, { isNew: false });
  };

  const handleDownload = async (photo) => {
    // Find the DOM element for the photo card (inner part to avoid selection border if on wrapper)
    // We target the specific photo's wrapper, then find .polaroid-card
    const wrapper = document.getElementById(`photo-${photo.id}`);
    if (wrapper) {
      const card = wrapper.querySelector('.polaroid-card');
      if (card) {
        try {
          const canvas = await html2canvas(card, {
            scale: 3, // High resolution
            backgroundColor: null,
            useCORS: true,
            logging: false
          });
          
          const link = document.createElement('a');
          link.download = `polaroid-${photo.timestamp.replace(/[:/]/g, '-')}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        } catch (err) {
          console.error("Download failed:", err);
        }
      }
    }
  };

  const selectedPhoto = photos.find(p => p.id === selectedPhotoId);

  return (
    <div className="app-container" onClick={() => setSelectedPhotoId(null)}>
      <div className="photo-wall">
        {photos.map((photo) => (
          <Photo
            key={photo.id}
            id={photo.id}
            src={photo.src}
            timestamp={photo.timestamp}
            isNew={photo.isNew}
            isSelected={photo.id === selectedPhotoId}
            onSelect={handleSelectPhoto}
            initialPos={{ x: photo.initialX, y: photo.initialY }}
            filterStyle={photo.style}
            onDevelop={handleDevelop}
          />
        ))}
      </div>
      
      <div className="camera-wrapper">
        <Camera onCapture={handleCapture} />
      </div>

      {selectedPhoto && (
        <div onClick={(e) => e.stopPropagation()}>
          <Editor 
            photo={selectedPhoto} 
            onUpdate={handleUpdatePhoto}
            onDownload={handleDownload}
            onClose={() => setSelectedPhotoId(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
