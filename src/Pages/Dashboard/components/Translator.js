import React, { useState, useEffect } from "react";
import api from "../../../axios.config";
import { exchange } from "../../../svgs";
import languages from "../languages";
import "../css/Translator.css";

const Translator = () => {
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("ar");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translate = async () => {
    try {
      setLoading(true);
      const srcL = source === "auto" ? "auto" : source;
      const res = await api.post("/translate", {
        srcL,
        target,
        text,
      });
      if (res.data.error) throw new Error(res.data.error);
      const translatedRes = res.data.translation.translations[0].translation;
      setTranslatedText(translatedRes);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    e.target.name === "source"
      ? setSource(e.target.value)
      : setTarget(e.target.value);
  };

  return (
    <div className="translator">
      <h4>Translator</h4>
      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}
      <div className="to-translate">
        <select name="source" defaultValue="auto" onChange={handleSelectChange}>
          <option value="auto">auto Detection</option>
          {languages.map((ln) => {
            return (
              <option key={ln.language_name} value={ln.language}>
                {ln.language_name}
              </option>
            );
          })}
        </select>
        <textarea
          name="toTranslate"
          id="toTranslate"
          value={text}
          placeholder="Text to translate"
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
        ></textarea>
      </div>
      <div className="exchange">
        <button onClick={translate}> {exchange} </button>
      </div>
      <div className="translation">
        <select
          name="target"
          defaultValue="Arabic"
          onChange={handleSelectChange}
        >
          {languages.map((ln) => {
            return (
              <option key={ln.language_name} value={ln.language}>
                {ln.language_name}
              </option>
            );
          })}
        </select>
        <textarea
          name="translation"
          id="translation"
          value={
            loading
              ? "Translating Now..., wait a second please"
              : translatedText
          }
          placeholder="Translation"
        ></textarea>
      </div>
    </div>
  );
};

export default Translator;
