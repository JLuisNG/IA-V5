// components/SignaturePad.jsx
import React, { useRef, useState, useEffect } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/SignaturePad.scss';

const SignaturePad = ({ 
  label = 'SIGN', 
  onSignatureChange, 
  initialSignature = null,
  disabled = false 
}) => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [hasSignature, setHasSignature] = useState(!!initialSignature);
  const [useUpload, setUseUpload] = useState(false);
  const [fileName, setFileName] = useState('');

  // Initialize the canvas
  useEffect(() => {
    if (useUpload) return; // Skip canvas initialization if in upload mode

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    const canvasWidth = canvas.parentElement.clientWidth;
    const canvasHeight = 150;

    // Handle pixel ratio for high-DPI screens
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Set up canvas context
    const ctx = canvas.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#334155';
    setContext(ctx);

    // Load initial signature if provided
    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        // Scale the image to fit the canvas while maintaining aspect ratio
        const aspectRatio = img.width / img.height;
        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        if (aspectRatio > canvasWidth / canvasHeight) {
          drawHeight = canvasWidth / aspectRatio;
        } else {
          drawWidth = canvasHeight * aspectRatio;
        }
        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        setHasSignature(true);
      };
      img.src = initialSignature;
    }

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [initialSignature, useUpload]);

  // Handle mouse down to start drawing
  const handleMouseDown = (e) => {
    if (disabled || useUpload) return;

    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width / (window.devicePixelRatio || 1));
    const y = (e.clientY - rect.top) * (canvas.height / rect.height / (window.devicePixelRatio || 1));

    context.beginPath();
    context.moveTo(x, y);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move to draw
  const handleMouseMove = (e) => {
    if (!isDrawing || !context) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width / (window.devicePixelRatio || 1));
    const y = (e.clientY - rect.top) * (canvas.height / rect.height / (window.devicePixelRatio || 1));

    context.lineTo(x, y);
    context.stroke();
  };

  // Handle mouse up to stop drawing
  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    setHasSignature(true);
    saveSignature();

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // Handle touch start to start drawing
  const handleTouchStart = (e) => {
    if (disabled || useUpload) return;

    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    e.preventDefault();
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width / (window.devicePixelRatio || 1));
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height / (window.devicePixelRatio || 1));

    context.beginPath();
    context.moveTo(x, y);

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
  };

  // Handle touch move to draw
  const handleTouchMove = (e) => {
    if (!isDrawing || !context) return;

    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width / (window.devicePixelRatio || 1));
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height / (window.devicePixelRatio || 1));

    context.lineTo(x, y);
    context.stroke();
  };

  // Handle touch end to stop drawing
  const handleTouchEnd = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    setHasSignature(true);
    saveSignature();

    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  // Clear the signature
  const clearSignature = () => {
    if (disabled) return;

    // If in drawing mode, clear the canvas
    if (!useUpload) {
      const canvas = canvasRef.current;
      if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    setHasSignature(false);
    setUseUpload(false);
    setFileName('');

    if (onSignatureChange) {
      onSignatureChange(null);
    }
  };

  // Save the signature as a data URL
  const saveSignature = () => {
    if (useUpload) return; // Skip saving canvas data if in upload mode

    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL('image/png');
    if (onSignatureChange) {
      onSignatureChange(signatureData);
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    // Check if the file is an image
    const isImage = file.type.startsWith('image/');
    
    if (isImage) {
      // If it's an image, render it on the canvas
      const reader = new FileReader();
      reader.onload = (event) => {
        // Temporarily switch to drawing mode to render the image on the canvas
        setUseUpload(false);
        setTimeout(() => {
          const canvas = canvasRef.current;
          if (!canvas || !context) return;

          const img = new Image();
          img.onload = () => {
            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
            const aspectRatio = img.width / img.height;
            let drawWidth = canvasWidth;
            let drawHeight = canvasHeight;
            if (aspectRatio > canvasWidth / canvasHeight) {
              drawHeight = canvasWidth / aspectRatio;
            } else {
              drawWidth = canvasHeight * aspectRatio;
            }
            context.drawImage(img, 0, 0, drawWidth, drawHeight);

            setHasSignature(true);
            saveSignature();
            // Switch back to upload mode after rendering
            setUseUpload(true);
          };
          img.src = event.target.result;
        }, 0);
      };
      reader.readAsDataURL(file);
    } else {
      // If it's not an image, store the file data as a signature reference
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
        if (onSignatureChange) {
          onSignatureChange(fileData);
        }
        setHasSignature(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  return (
    <div className={`signature-pad ${disabled ? 'disabled' : ''}`}>
      <div className="signature-options">
        <label className="upload-toggle">
          <input
            type="checkbox"
            checked={useUpload}
            onChange={(e) => {
              setUseUpload(e.target.checked);
              if (!e.target.checked) {
                clearSignature();
              }
            }}
            disabled={disabled}
          />
          Captured signature outside of system
        </label>
      </div>

      <div className="signature-area">
        <span className="signature-label">{label}</span>
        {useUpload ? (
          <div className="upload-area">
            <button
              className="upload-btn"
              onClick={handleUploadClick}
              disabled={disabled}
            >
              Upload Signature File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            {fileName && (
              <div className="file-name">
                Uploaded: {fileName}
              </div>
            )}
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className={`signature-canvas ${hasSignature ? 'has-signature' : ''}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        )}
        <div className="signature-line"></div>
      </div>

      <button 
        className="clear-btn" 
        onClick={clearSignature}
        disabled={disabled || !hasSignature}
      >
        CLEAR
      </button>
    </div>
  );
};

export default SignaturePad;