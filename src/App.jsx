import "./App.css";
import { useEffect, useState } from "react";

import axios from 'axios'

const ol_api = axios.create({
  baseURL: 'https://openlibrary.org/search.json?q=the+lord+of+the+rings'
})


function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {

    Promise.all([
      ol_api.get("/"),
    ])

    .then(([booksRes]) => {
      setBooks(booksRes.data.docs);
      setLoading(false);
    })

    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, 
  []);

  return (
    <div>
      <h1>📚 Book List</h1>

      {loading ? ( 
        <p>Loading books...</p> // Show loading text while fetching
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <h3>Title: {book.title}</h3>
              <p>Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
              <p>First Published: {book.first_publish_year || "N/A"}</p>
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}></img>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
