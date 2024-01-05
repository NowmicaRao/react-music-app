// src/App.js
import React, { useEffect, useState } from "react";
import ArtistList from "./components/ArtistList";
import ArtistDetails from "./components/ArtistDetails";
import "./App.css";
import { ARTIST_LIST } from "./components/constant";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtistIndex, setSelectedArtistIndex] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedSong, setSelectedSong] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [showList, setShowList] = useState(true);
  const [newArtist, setNewArtist] = useState(ARTIST_LIST);
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    var data = localStorage.getItem("myData");
    var data1 = localStorage.getItem("other");
    var data2 = localStorage.getItem("refresh");
    if(data2) setShowList(false);

   
    if (data) setSelectedSong(JSON.parse(data));
      if (data1) setSelectedArtistIndex(JSON.parse(data1));
  }, []);

  const handleSelectArtist = (index, artist) => {
    localStorage.clear();
    
    setSelectedArtistIndex(index);
    setSelectedArtist(artist);
    
    if(artist && Object.values(artist).length && artist.songs) setSearchTerm(artist.name + ":" + artist.songs[0].title);
    else setSearchTerm(artist.name);

    const updatedData = newArtist.map((ele, id) => {
      if (ele.name === artist.name && ele.songs) {
        setListItem(ele.songs.map((song) => song.title));
        return ele.songs[0];
      } else return ele;
    });
    setSelectedSong(updatedData);
  };

  return (
    <div className="App">
      {showList ? 
      <ArtistList
        selectedArtistIndex={selectedArtistIndex}
        setSelectedArtistIndex={setSelectedArtistIndex}
        handleSelectArtist={handleSelectArtist}
        newArtist={newArtist}
        setNewArtist={setNewArtist}
        setIsListOpen={setIsListOpen}
      />
      : null }
      <ArtistDetails
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedArtistIndex={selectedArtistIndex}
        setSelectedArtistIndex={setSelectedArtistIndex}
        selectedArtist={selectedArtist}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        listItem={listItem}
        showList = {showList}
        newArtist={newArtist}
        setNewArtist={setNewArtist}
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
      />
    </div>
  );
}

export default App;
