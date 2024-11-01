import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5501/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center pl-1">
        <h1 className="text-3xl my-8">List of Books</h1>
        <Link to={`/books/create`}>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <div className="flex gap-x-4 pl-2 pb-2">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      {loading && <Spinner />}
      {!loading && showType === "table" && <BooksTable books={books} />}
      {!loading && showType === "card" && <BooksCard books={books} />}
    </div>
  );
};

export default Home;
