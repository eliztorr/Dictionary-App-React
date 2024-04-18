import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [definition, setDefinition] = useState(null);
  const [photos, setPhotos] = useState([]);

  function handleAudioResponse(response) {
    setResults(response.data[0]);
  }

  function handleImages(response) {
    setPhotos(response.data.photos);
  }

  function handleResponse(response) {
    setDefinition(response.data);
    let apiKey = "95302ab7f46ea49b23t9315bo4bc8de7";
    let apiUrl = `https://api.shecodes.io/images/v1/search?query=${response.data.word}&key=${apiKey}`;
    axios
      .get(apiUrl, { headers: { Authorization: `Bearer ${apiKey}` } })
      .then(handleImages);
  }

  function load() {
    setLoaded(true);
    search();
  }

  function search() {
    let apiKey = "95302ab7f46ea49b23t9315bo4bc8de7";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

    console.log("API URL:", apiUrl);

    axios.get(apiUrl).then(handleResponse);
  }

  function getAudio(){
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleAudioResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
        <form onSubmit={handleSubmit} className="search-form">
            <label>Type the word you want to search 
            <input 
              type="search"
              id="searchInput"
              placeholder="Search for a word"
              defaultValue={props.defaultKeyword}
              autoFocus={true}
              className="form-control search-input"
              onChange={handleKeywordChange}
            />
            </label>
          
          </form>
        </section>
        <Results definition={definition} />
        <Photos photos={photos} />
      </div>
      
  );
      
  } else {
    load();
    return "Loading!"
  }

}