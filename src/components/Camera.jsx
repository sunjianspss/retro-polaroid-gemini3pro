import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import './Camera.css';

const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (onCapture) {
        onCapture(imageSrc);
      }
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="camera-container">
      <div className="camera-body">
        <div className="camera-face">
          <div className="top-section">
            <div className="flash-unit">
               <div className="flash-glass"></div>
            </div>
            <div className="viewfinder">
               <div className="viewfinder-glass"></div>
            </div>
          </div>
          
          <div className="lens-section">
            <div className="lens-outer-ring">
              <div className="lens-mid-ring">
                <div className="lens-inner-ring">
                  <div className="lens-glass">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="webcam-video"
                      mirrored={true}
                      videoConstraints={{
                        width: 300,
                        height: 300,
                        facingMode: "user"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shutter-section">
            <button className="shutter-button" onClick={handleCapture} aria-label="Take Photo">
              <div className="shutter-inner"></div>
            </button>
          </div>
          
          <div className="camera-hole"></div>
        </div>
        
        <div className="photo-output-slot"></div>
      </div>
    </div>
  );
};

export default Camera;

