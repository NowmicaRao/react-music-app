// src/ArtistList.js
import React, { useState } from 'react';
import '../styles.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ArtistModal from './ArtistModal';

const ArtistList = (props) => {

  const {selectedArtistIndex, setSelectedArtistIndex, handleSelectArtist , newArtist, setNewArtist, setIsListOpen } = props;
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newArtistInfo, setNewArtistInfo] = useState({ name: '', nationality: '', age: '' });
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewArtistInfo({ name: '', nationality: '', age: '' });
  };

  const isNameDuplicate = (name) => {
    return newArtist.some((artist) => artist.name.toLowerCase() === name.toLowerCase());
  };

  const handleAddArtist = () => {
    
    if (newArtistInfo.name && newArtistInfo.nationality && newArtistInfo.age) {
      if (!isNameDuplicate(newArtistInfo.name)) {
        const updatedArtists = [...newArtist, newArtistInfo];
        setNewArtist(updatedArtists);
        setNewArtist(updatedArtists);
        closeModal();
      } else {
        alert('Artist with this name already exists!');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age' && !/^\d*$/.test(value)) {
      return;
    }

    setNewArtistInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  
  const handleRemoveArtist = () => {
    if (selectedArtistIndex !== null) {
      const updatedArtists = [...newArtist];
      updatedArtists.splice(selectedArtistIndex, 1);
      setNewArtist(updatedArtists);
      setSelectedArtistIndex(null);
      setIsListOpen(false);
    }
  };

  return (
    <div className="background-div"><br />
      <div className="artist-cards">
        {newArtist.map((artist, index) => (
          <div
            key={index}
            className={`mb-4 card ${selectedArtistIndex === index ? 'card-selected' : ''}`}
            onClick={() => handleSelectArtist(index, artist)}
          >
            <div className="card-body">
              <p className="card-text">
                Name: {artist.name} <br />
                Nationality: {artist.nationality} <br />
                Age: {artist.age} 
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={openModal} className="btn">
          Add Artist
        </button>
        <button
          onClick={handleRemoveArtist}
          className="btn"
        >
          Remove Artist
        </button>
      </div>

      {/* Bootstrap Modal for adding a new artist */}
      <ArtistModal modalIsOpen={modalIsOpen} closeModal={closeModal} newArtistInfo={newArtistInfo} handleAddArtist={handleAddArtist} handleInputChange={handleInputChange}/>      
    </div>
  );
};

export default ArtistList;
