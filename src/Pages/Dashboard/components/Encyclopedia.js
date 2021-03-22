import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsonpAdapter from "axios-jsonp";
import { Markup } from "interweave";
import { useParams, useHistory } from "react-router-dom";
import "../css/Encyclopedia.css";

let searchUrl =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
let contentUrl =
  "https://en.wikipedia.org/w/api.php?format=xml&action=query&origin=*&prop=revisions&rvprop=content&titles=";

const Encyclopedia = () => {
  const [search, setSearch] = useState("");
  const [titles, setTitles] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const params = useParams();
  const history = useHistory();

  const formatContent = (content) => {
    const newContent = /.*\./.exec(content).input;
    console.log(newContent);

    const removeDoubleBracketContent = newContent.replace(
      /(?<={{)[^}]+(?=}})/g,
      (selection) => {
        return "";
      }
    );
    const removeOpenBrackets = removeDoubleBracketContent.replace(/{/g, "");
    const removeCloseBrackets = removeOpenBrackets.replace(/}/g, "");
    const removeRef = removeCloseBrackets.replace(
      /<ref(.*?)>((.*?)<\/ref>)?/g,
      ""
    );
    const remoceTripleQuotes = removeRef.replace(/'''/g, "");
    const pickSecondOption = remoceTripleQuotes.replace(
      /\[\[(.*?)\|?(.*?)\]\]/g,
      (selection) => {
        const secondChoice = /(?<=\|).+?(?=\]\])/g.exec(selection);
        const onlyChoice = /(?<=\[\[).+?(?=\]\])/g.exec(selection);
        return !secondChoice
          ? `<b>${onlyChoice}</b>`
          : `<b>${secondChoice}</b>`;
      }
    );

    /*

    const checkH4 = pickSecondOption.replace(/====(.*?)====/g, (s) => {
      const str = /(?<=====).+?(?=====)/g.exec(s);
      return `<h4>${str}</h4>`;
    });
    const deleteH4 = checkH4.replace(/====/g, "");
    const checkH3 = deleteH4.replace(/===(.*?)===/g, (s) => {
      const str = /(?<====).+?(?====)/g.exec(s);
      return `<h3>${str}</h3>`;
    });
    const deleteH3 = checkH3.replace(/===/g, "");
    const checkH2 = deleteH3.replace(/==(.*?)==/g, (s) => {
      const str = /(?<===).+?(?===)/g.exec(s);
      return `<h2>${str}</h2>`;
    });
    const deleteH2 = checkH2.replace(/==/g, "");
    const checkH1 = deleteH2.replace(/=(.*?)=/g, (s) => {
      const str = /(?<==).+?(?==)/g.exec(s);
      return `<h1>${str}</h1>`;
    });
    const deleteH1 = checkH1.replace(/=/g, "");
    */

    return content;
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (params.title) {
        setLoading(true);
        setSearch(params.title);
        const res = await axios({
          url: contentUrl + params.title,
          adapter: jsonpAdapter,
        });
        console.log(res);
        const pageId = Object.keys(res.data.query.pages)[0];
        const pageContent = res.data.query.pages[pageId].revisions[0]["*"];
        setContent(formatContent(pageContent));
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const res = await axios({
      url: searchUrl + search,
      adapter: jsonpAdapter,
    });
    console.log(res);
    setTitles(res.data[1]);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        "loading..."
      ) : (
        <div className="encyclopedia">
          <h4>Encyclopedia</h4>
          <form onSubmit={handleSubmit}>
            <input
              value={search}
              type="text"
              name="search"
              id="search"
              placeholder="What do you want to learn Today?"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div className="result">
            {!params.title ? (
              titles.map((title, index) => {
                const formatedTitle = title.replace(/\s+/g, "_");
                return (
                  <a
                    className="wiki-link"
                    href={`/dashboard/encyclopedia/${formatedTitle}`}
                    key={index}
                  >
                    {title}
                  </a>
                );
              })
            ) : (
              <div id="formated-content">
                <Markup content={content} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Encyclopedia;
