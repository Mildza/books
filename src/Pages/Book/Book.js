import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./Book.scss";

const API = "http://openlibrary.org/search.json?q=/";

const Book = () => {
  const [details, setDetails] = useState();
  const { id } = useParams();

  const getBooks = () => {
    axios.get(API + id).then((response) => {
      setDetails(response.data.docs[0]);
    });
  };

  useEffect(() => {
    getBooks();
  }, [id]);

  return (
    <div className="details">
      {details && (
        <>
          <h1>{details.title}</h1>
          <div className="content">
            <h3>
              <span>{details.author_name}</span>
            </h3>
            <h3>
              <span>{details.first_publish_year}</span>
            </h3>
            {details.subject && (
              <h3>
                <span>Describe:</span> {details.subject.join(", ")}
              </h3>
            )}
            {details.first_sentence && (
              <h4>
                <span>First Sentence:</span> {details.first_sentence}
              </h4>
            )}
            <h4>
              <span>Edition count:</span> {details.edition_count}
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Book;
