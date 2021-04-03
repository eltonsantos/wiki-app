import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let timerId = null;

    if (value) {
      timerId = setTimeout(async () => {
        const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: value,
          },
        });

        setResults(data.query.search);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return (
    <div className="ui grid container center aligned" style={{marginTop: "20px"}}>
      <h1>Search Wikipedia</h1>
      <div className="column sixteen wide">
        <form className="ui form">
          <input
            type="text"
            placeholder="Search Wikipedia..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>

        { results.map((item) => (
          <div key={item.pageid} className="ui segment">
            <h2>
              <a href={"https://en.wikipedia.org?curid=" + item.pageid } className="header" target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: item.snippet }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
