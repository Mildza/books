import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.scss";
import Books from "../../components/Books/Books";
import Spiner from "./../../components/spiner/Spiner";
import Pagination from "./../../components/pagination/Pagination";
import CacheData from "./../../shared/cache";

const API = "http://openlibrary.org/search.json?title=";

const Home = () => {
  const localSearchItem = localStorage.getItem("search");
  const [searchItem, setSearchItem] = useState(localSearchItem || "");
  const [books, setBooks] = useState();
  const [spinner, setSpinner] = useState(false);
  const [activeStep, setActiveStep] = useState(CacheData.getActiveStep() || 0);
  const [pages, setPages] = useState([]);
  const [numPages, setNumPages] = useState(0);
  console.log(CacheData.getActiveStep());

  const getBooks = async () => {
    let response = await axios.get(API + searchItem);
    setBooks(response);
    setNumPages(Math.ceil(response.data.docs.length / 25));
    CacheData.setCache(response);
    CacheData.setStatus(200);
    CacheData.setNumPages(Math.ceil(response.data.docs.length / 25));
    setSpinner(false);
  };

  useEffect(() => {
    if (books) {
      let num = books.data.docs.slice(activeStep * 25, activeStep * 25 + 25);
      setPages(num);
      CacheData.setActiveStep(activeStep);
    }
  }, [books, activeStep]);

  const inputHandler = (e) => {
    setSearchItem(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSpinner(true);
    getBooks();
    localStorage.setItem("search", searchItem);
    setActiveStep(0);
  };

  useEffect(() => {
    if (localSearchItem) {
      if (CacheData.getStatus() === 200) {
        setBooks(CacheData.getCache);
        setNumPages(CacheData.getNumPages);
        setActiveStep(CacheData.getActiveStep);
      } else {
        getBooks();
      }
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === numPages) {
        return prevActiveStep;
      }
      return prevActiveStep + 1;
    });
    scrollToTop();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 0) {
        return prevActiveStep;
      }
      return prevActiveStep - 1;
    });
    scrollToTop();
  };

  const handlePage = (page) => {
    setActiveStep(page - 1);
    scrollToTop();
  };

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="home">
      <h2>Find Your Favorite Book</h2>
      <form onSubmit={submitHandler}>
        <input type="text" value={searchItem} onChange={inputHandler} />
        <button>search</button>
      </form>
      {spinner ? (
        <Spiner />
      ) : (
        books && (
          <>
            {console.log(books)}
            <p>Books found: {books.data.numFound}</p>
            {pages.map((el) => (
              <Link key={el.key} to={`${el.key}`}>
                <Books data={el} />
              </Link>
            ))}
            <Pagination
              next={handleNext}
              back={handleBack}
              page={handlePage}
              numPages={numPages}
              activeStep={activeStep}
            />
          </>
        )
      )}
    </div>
  );
};

export default Home;
