import React from "react";
import "./Phonetic.css";

export default function Phonetic(props) {
  if (props.phonetic) {
    return (
      <div className="Phonetic">
        <h3>/{props.phonetic}/</h3>
      </div>
    );
  } else {
    return null;
  }
}