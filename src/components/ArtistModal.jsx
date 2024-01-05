import React from "react";
import Modal from 'react-modal';
import '../styles.css'; // Import the CSS file

const ArtistModal = (props) => {
    const {modalIsOpen, closeModal, newArtistInfo, handleAddArtist, handleInputChange} = props;
    return(
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Artist Modal"
        className="modal-dialog modal-dialog-centered modal-sm modal-centered"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Artist</h5><br />
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newArtistInfo.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Nationality:</label>
                <input
                  type="text"
                  name="nationality"
                  value={newArtistInfo.nationality}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="text"
                  name="age"
                  value={newArtistInfo.age}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div><br />
              <button type="button" onClick={handleAddArtist} className="btn btn-secondary">
                Add 
              </button>
              
            </form>
          </div>
        </div>
      </Modal>
    )
}

export default ArtistModal;