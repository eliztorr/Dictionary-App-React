import React, { useState, useEffect, useCallback } from "react";
import Phonetic from "./Phonetic";
import Meaning from "./Meaning";
import "./Results.css";

export default function Results(props) {
  const [audioUrls, setAudioUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define handleAudioFetch using useCallback
  const handleAudioFetch = useCallback(() => {
    if (props.definition?.word) {
      let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${props.definition.word}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const urls = data[0]?.phonetics
            .filter((phonetic) => phonetic.audio)
            .map((phonetic) => phonetic.audio);
          setAudioUrls(urls);
          setIsLoading(false); // Set loading state to false once audio URLs are fetched
        })
        .catch((error) => {
          console.error("Error fetching audio:", error);
          setIsLoading(false); // Set loading state to false in case of error
        });
    }
  }, [props.definition]); // Include props.definition as a dependency

  // Fetch audio URLs when component mounts
  useEffect(() => {
    handleAudioFetch(); // Call handleAudioFetch when props.definition changes
  }, [handleAudioFetch]); // Include handleAudioFetch as a dependency

  // Function to handle playing audio
  const handlePlayAudio = (audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  // Determine the label for the audio type
  const getAudioTypeLabel = (url) => {
    if (url.includes("uk.mp3")) {
      return "UK";
    } else if (url.includes("us.mp3")) {
      return "US";
    } else if (url.includes("ca.mp3")) {
      return "Canada";
    } else if (url.includes("au.mp3")) {
      return "Australia";
    } else {
      return ""; 
    }
  };

  // Check if props.definition exists and is not null
  if (props.definition) {
    return (
      <div className="Results">
        <section>
          <h2>{props.definition.word}</h2>
          <Phonetic phonetic={props.definition.phonetic} />
          {/* Button for fetching audio (visible during loading) */}
          {isLoading && <button disabled>Loading...</button>}
          {/* Buttons for playing audio (conditionally rendered after loading) */}
          {!isLoading &&
            audioUrls.map((url, index) => {
              const audioType = getAudioTypeLabel(url);
              return (
                <button
                  key={index}
                  onClick={() => handlePlayAudio(url)}
                >
                  Play Audio {audioType}
                </button>
              );
            })}
          {/* Display "No audio available" message if no audio URLs */}
          {!isLoading && audioUrls.length === 0 && (
            <p>No audio available</p>
          )}
        </section>

        {/* Check if props.definition.meanings is an array before mapping over it */}
        {Array.isArray(props.definition.meanings) &&
          props.definition.meanings.map((meaning, index) => (
            <section key={index}>
              <Meaning meaning={meaning} />
            </section>
          ))}
      </div>
    );
  } else {
    return null;
  }
}
