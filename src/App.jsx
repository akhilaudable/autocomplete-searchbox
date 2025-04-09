import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[searchInput]) {
      setSearchData(cache[searchInput]);
      return;
    }
    let response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchInput}`
    );
    response = await response.json();
    setSearchData(response.recipes);
    setCache((prev) => ({ ...prev, [searchInput]: response.recipes }));
  };

  useEffect(() => {
    fetchData()
  }, [searchInput]);

  return (
    <div className="App">
      <h1>Autocomplete Searchbar</h1>
      <div>
        <input
          className="search-name"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          onFocus={() => setShowList(true)}
        />
      </div>
      {showList && (
        <div className="result-container">
          {searchData.map((item) => {
            return (
              <div onClick={(e) => {  
                  setSearchInput(item.name)
                  setShowList(false)
                }} className="result" key={item.id}>
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
