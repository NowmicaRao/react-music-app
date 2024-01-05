// ArtistDetails.js
import React, { useState } from "react";
import { FaBars, FaExternalLinkAlt } from "react-icons/fa";
import "../styles.css";

const ArtistDetails = (props) => {
  const {
    setSearchTerm,
    searchTerm,
    selectedArtistIndex,
    selectedArtist,
    selectedSong,
    setSelectedSong,
    listItem,
    showList,
    newArtist,
    isListOpen,
    setIsListOpen,
  } = props;

  const handleSearchChange = (e) => {
    if (showList) {
      setSearchTerm(e.target.value);
      localStorage.clear();
    }
    // Perform search-related logic here if needed
  };

  const handleHamburgerClick = () => {
    if (selectedArtistIndex !== null) setIsListOpen(!isListOpen);
    else setIsListOpen(isListOpen);
  };

  const handleListItemClick = (item, index) => {
    var songName = selectedArtist.name + ":" + item;
    setSearchTerm(songName);
    setIsListOpen(false);
    const updatedSong = newArtist[selectedArtistIndex].songs.filter(
      (ele, id) => ele.id === index && ele
    );
    setSelectedSong(updatedSong);
    console.log("upsong", selectedSong);
  };

  const onIconclick = () => {
    localStorage.setItem("myData", JSON.stringify(selectedSong));
    localStorage.setItem("other", JSON.stringify(selectedArtistIndex));
    localStorage.setItem("refresh", true);
    window.open("/new-tab", "_blank");
  };

  return (
    <div className="details">
      <div className="search-bar">
        <div className="icon icon-left" onClick={handleHamburgerClick}>
          <FaBars size={20} />
          {isListOpen ? (
            <ul className="list">
              {listItem.length
                ? listItem.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleListItemClick(item, index)}
                    >
                      {item}
                    </li>
                  ))
                : null}
            </ul>
          ) : null}
        </div>
        <input
          id="search-bar-input"
          type="text"
          placeholder={showList ? "Search artists..." : null}
          value={searchTerm}
          onChange={(event) => handleSearchChange(event)}
          className="form-control"
        />
        {showList ? (
          <div className="icon icon-right" onClick={onIconclick}>
            <FaExternalLinkAlt size={20} />
          </div>
        ) : null}
      </div>

      <div className={selectedSong.length ? "lyrics" : "new"}>
        {selectedSong.length ? (
          (selectedSong[0].songs || selectedSong[0].song) &&
          selectedArtistIndex !== null ? (
            selectedSong.map((ele) => (
              <div className="song">
                {" "}
                <pre>{ele.song}</pre>
              </div>
            ))
          ) : (
            <div>No songs found </div>
          )
        ) : null}
      </div>

      <div className={selectedSong.length ? "song-details" : "no-song"}>
        {selectedSong.length && selectedSong.length !== 1 ? (
          selectedArtistIndex !== null &&
          selectedSong[selectedArtistIndex].composer ? (
            <div>
              <div>Composer: {selectedSong[selectedArtistIndex].composer}</div>
              <div>Producer: {selectedSong[selectedArtistIndex].producer}</div>
              <div>awards: {selectedSong[selectedArtistIndex].awards}</div>
              <div>
                production: {selectedSong[selectedArtistIndex].production}
              </div>
            </div>
          ) : null
        ) : selectedSong.length &&
          selectedSong[0].composer &&
          selectedArtistIndex !== null ? (
          <div>
            <div>Composer: {selectedSong[0].composer}</div>
            <div>Producer: {selectedSong[0].producer}</div>
            <div>awards: {selectedSong[0].awards}</div>
            <div>production: {selectedSong[0].production}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArtistDetails;
