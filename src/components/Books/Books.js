import React from "react";

import "./Books.scss";

const Books = ({ data }) => {
  return (
    <div className="books">
      <h2>{data.title_suggest}</h2>
      {data.isbn && (
        <img
          src={`http://covers.openlibrary.org/b/isbn/${data.isbn[0]}-M.jpg`}
          alt={data.title_suggest}
        />
      )}
      <h3>{data.author_name}</h3>
    </div>
  );
};

export default Books;
