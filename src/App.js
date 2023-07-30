// App.js
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import MovieForm from "./components/MovieForm";
import AllMovies from "./components/AllMovies";
import Sidebar from "./components/Sidebar";
import AdminOptions from "./components/AdminOptions";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            {" "}
            {/* Use Routes instead of Switch */}
            <Route path="/" element={<AllMovies />} />
            <Route path="/add-movie" element={<MovieForm />} />
            <Route path="/admin-options" element={<AdminOptions />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
