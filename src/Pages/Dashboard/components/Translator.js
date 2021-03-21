import React from "react";

import { exchange } from "../../../svgs";
import "../css/Translator.css";

const Translator = () => {
  return (
    <div className="translator">
      <h4>Translator</h4>
      <div className="to-translate">
        <select defaultValue="Choose a language...">
          <option value="Choose a language...">Choose a language...</option>
          <option value="english">English</option>
          <option value="arabic">Arabic</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
        </select>
        <textarea
          name="toTranslate"
          id="toTranslate"
          placeholder="Text to translate"
        ></textarea>
      </div>
      <div className="exchange">
        <button> {exchange} </button>
      </div>
      <div className="translation">
        <select defaultValue="Choose a language...">
          <option value="Choose a language...">Choose a language...</option>
          <option value="english">English</option>
          <option value="arabic">Arabic</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
        </select>
        <textarea
          name="translation"
          id="translation"
          placeholder="Translation"
        ></textarea>
      </div>
    </div>
  );
};

export default Translator;
