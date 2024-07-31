import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './Form.css';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [rank, setRank] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = new jsPDF();

    const imgX = 10; 
    const imgY = 10; 
    const imgWidth = 60;
    const imgHeight = 60; 
    
    const textX = imgX + imgWidth + 10; 
    const textY = imgY + (imgHeight / 2); 

    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
       
        doc.addImage(imgData, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        
        doc.setFontSize(12);
        doc.text(`ID: ${idNumber}`, textX, textY - 10); 
        doc.text(`User Name: ${name}`, textX, textY + 10); 
        
        const congratsY = imgY + imgHeight + 20; 
        doc.text(`Congratulations!! You have secured ${rank} `, 10, congratsY);    
        doc.save('output.pdf');
      };
      reader.readAsDataURL(photo);
    }
  };

  return (
    <div className="container">
      <h2 className="header">User Information Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label className="label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Rank:</label>
          <select 
            value={rank} 
            onChange={(e) => setRank(e.target.value)} 
            className="select"
            required
          >
            <option value="" disabled>Select Rank</option>
            <option value="First Rank">First Rank</option>
            <option value="Second Rank">Second Rank</option>
            <option value="Third Rank">Third Rank</option>
          </select>
        </div>
        <div className="formGroup">
          <label className="label">ID Number:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            pattern="#\d{6}"
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">Generate PDF</button>
      </form>
    </div>
  );
};

export default FormComponent;
