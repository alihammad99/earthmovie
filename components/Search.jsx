import React, { useEffect, useState, useLayoutEffect } from "react";
import SearchCard from "./SearchCard";
import searchMovie from "@/utils/search-movie";

const Search = () => {
  const [width, setWidth] = useState(0);
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (text.length > 2) {
      searchMovie(text, setResult);
    } else {
      setResult([]);
    }
  }, [text]);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    console.log(result);
  }, [result]);

  if (!width) return;
  return (
    <div style={styles.container}>
      <input
        onChange={(e) => setText(e.target.value)}
        style={
          width < 560 ? { ...styles.input, width: width - 36 } : styles.input
        }
        type="search"
        placeholder="Search"
        value={text}
      />
      {result.length > 0 && (
        <>
          <div style={width < 560 ? { ...styles.list, top: 94 } : styles.list}>
            {renderResult(result, setText)}
          </div>
          <div onClick={() => setText("")} style={styles.dark}></div>
        </>
      )}
    </div>
  );
};

const renderResult = (items, setText) => {
  return items.map((item) => (
    <SearchCard
      title={item.title}
      rate={item.vote_average.toFixed(1)}
      poster={item.poster_path}
      movieId={item.id}
      setText={setText}
    />
  ));
};

export default Search;

const styles = {
  container: {
    zIndex: 250,
  },
  dark: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1b1c25",
    position: "fixed",
    left: 0,
    top: 0,
    opacity: 0.35,
    zIndex: -10,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: "#F7F8FF",
    border: "1px solid #F2F2FB",
    outlineWidth: 0,
    width: 294,
  },
  list: {
    position: "absolute",
    backgroundColor: "#F7F8FF",
    padding: 12,
    top: 40,
    borderRadius: "0 0 12px 12px",
    boxShadow: "0px 24px 18px 0px rgba(13, 20, 80, 0.1)",
  },
};
