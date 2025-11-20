import React from 'react';
import { Download, Wand2, Palette, X } from 'lucide-react';
import './Editor.css';

const Editor = ({ photo, onUpdate, onDownload, onClose }) => {
  const filters = [
    { name: 'Normal', style: {} },
    { name: 'Beauty', style: { brightness: 110, contrast: 95, blur: 0.5, saturate: 100 } },
    { name: 'Vintage', style: { sepia: 50, contrast: 110, brightness: 90, saturate: 80 } },
    { name: 'B&W', style: { grayscale: 100, contrast: 120 } },
    { name: 'Cool', style: { hueRotate: 180, contrast: 90 } },
  ];

  const currentStyle = photo.style || { brightness: 100, contrast: 100, blur: 0, saturate: 100, sepia: 0, grayscale: 0, hueRotate: 0 };

  const handleChange = (key, value) => {
    const newStyle = { ...currentStyle, [key]: value };
    onUpdate(photo.id, { style: newStyle });
  };

  const applyPreset = (presetStyle) => {
    // Merge preset with defaults to ensure unset values are reset
    const defaultStyle = { brightness: 100, contrast: 100, blur: 0, saturate: 100, sepia: 0, grayscale: 0, hueRotate: 0 };
    const newStyle = { ...defaultStyle, ...presetStyle };
    onUpdate(photo.id, { style: newStyle });
  };

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h3>Edit Photo</h3>
        <button onClick={onClose} className="close-btn"><X size={18} /></button>
      </div>

      <div className="editor-section">
        <h4><Palette size={16} /> Filters</h4>
        <div className="filter-buttons">
          {filters.map(f => (
            <button key={f.name} onClick={() => applyPreset(f.style)} className="filter-btn">
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="editor-section">
        <h4><Wand2 size={16} /> Adjustments</h4>
        <div className="slider-group">
          <label>Brightness</label>
          <input 
            type="range" min="50" max="150" 
            value={currentStyle.brightness || 100} 
            onChange={(e) => handleChange('brightness', Number(e.target.value))} 
          />
        </div>
        <div className="slider-group">
          <label>Contrast</label>
          <input 
            type="range" min="50" max="150" 
            value={currentStyle.contrast || 100} 
            onChange={(e) => handleChange('contrast', Number(e.target.value))} 
          />
        </div>
        <div className="slider-group">
          <label>Skin Smooth</label>
          <input 
            type="range" min="0" max="5" step="0.1"
            value={currentStyle.blur || 0} 
            onChange={(e) => handleChange('blur', Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="editor-actions">
        <button className="download-btn" onClick={() => onDownload(photo)}>
          <Download size={18} /> Download
        </button>
      </div>
    </div>
  );
};

export default Editor;

