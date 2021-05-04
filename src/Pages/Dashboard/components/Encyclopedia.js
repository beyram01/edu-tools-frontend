import React, { useState, useEffect } from "react";
import axios from "axios";
import jsonpAdapter from "axios-jsonp";
import { Markup } from "interweave";
import { useParams } from "react-router-dom";
import Spinner from "../../_GlobalComponents/Spinner";
import "../css/Encyclopedia.css";

let searchUrl =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
let contentUrl =
  "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&redirects=true&titles=";

// https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=unicorn&redirects=true

const Encyclopedia = () => {
  const [search, setSearch] = useState("");
  const [titles, setTitles] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [didMount, setDidMount] = useState(false);
  const [disable, setDisable] = useState(false);

  const params = useParams();

  const formatContent = (content) => {
    const newContent = content.replace(
      /(<h2><span id="See_also">|<h2><span id="References">|<h2><span id="External_links">|<h2><span id="Further_reading">)(.|\s)*/g,
      ""
    );

    return newContent;
  };

  useEffect(() => {
    setDidMount(true);
    const fetchContent = async () => {
      setLoading(true);
      if (params.title) {
        setDisable(true);
        setSearch(params.title);
        const res = await axios({
          url: contentUrl + params.title,
          adapter: jsonpAdapter,
        });
        const pageId = Object.keys(res.data.query.pages)[0];
        const pageContent = res.data.query.pages[pageId].extract;
        setContent(formatContent(pageContent));
      }
      setLoading(false);
    };
    fetchContent();
    return () => setDidMount(false);
  }, [params.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitles([]);
    setLoading(true);
    const res = await axios({
      url: searchUrl + search,
      adapter: jsonpAdapter,
    });
    if (res.data[1].length > 0) {
      setTitles(res.data[1]);
    } else {
      setError("Sorry, We couldn't found any information about this topic");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="encyclopedia">
        <h4>Encyclopedia</h4>
        <form onSubmit={handleSubmit}>
          <input
            disabled={disable}
            value={search}
            type="text"
            name="search"
            id="search"
            placeholder="What do you want to learn Today?"
            onChange={(e) => {
              setSearch(e.target.value);
              setError("");
            }}
          />
          <button type="submit" disabled={disable}>
            Search
          </button>
        </form>
        <div className="result">
          {loading ? (
            <Spinner cx="20" cy="20" r="20" width="100%" height="100%" />
          ) : !params.title ? (
            !error ? (
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
              <div className="search-error">{error}</div>
            )
          ) : (
            <div id="formated-content">
              <Markup content={content} />
            </div>
          )}
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
    </>
  );
};

export default Encyclopedia;
