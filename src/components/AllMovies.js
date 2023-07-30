/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { handleGetAllMovies } from "../api/Api";
import Pagination from "./Pagination";

const MovieForm = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filterYear, setFilterYear] = useState(""); // State for the selected year filter

  useEffect(() => {
    const getMovies = async () => {
      const moviesFromApi = await handleGetAllMovies();
      setMovies(moviesFromApi);
    };
    getMovies();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter movies by year
  const filteredMovies = filterYear
    ? movies.filter(
        (movie) => new Date(movie.date).getFullYear() === parseInt(filterYear)
      )
    : movies;

  return (
    <div>
      <h1 className="header">Todas las Películas</h1>
      <div className="mt-5 mx-auto col-6">
        {/* Year filter */}
        <div className="mb-3">
          <label htmlFor="filterYear" className="form-label">
            Filtrar por Año:
          </label>
          <select
            id="filterYear"
            className="form-select"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">Todas</option>
            {/* Assuming you have movies from multiple years, extract unique years for filtering */}
            {[
              ...new Set(
                movies.map((movie) => new Date(movie.date).getFullYear())
              ),
            ].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* Table */}
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr className="bg-primary">
              <th>Nombre</th>
              <th>Presupuesto</th>
              <th>Fecha Lanzamiento</th>
              <th>Duracion</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{formatCurrency(movie.budget)}</td>
                <td>{new Date(movie.date).toLocaleDateString()}</td>
                <td>{movie.duration} minutos</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredMovies.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default MovieForm;
