// Sidebar.js
import React, { useEffect, useState } from "react";
import { handleGetAllOptions } from "../api/Api";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const optionsFromApi = await handleGetAllOptions();
      setOptions(optionsFromApi);
    };
    getOptions();
  }, []);

  return (
    <div className="sidebar bg-light">
      <ul className="list-unstyled">
        {options.map((option) => (
          <li key={option.id} className="mb-3">
            <Link
              to={
                option.name === "Listado Peliculas"
                  ? "/"
                  : option.name === "Rentar Peliculas"
                  ? "#"
                  : option.name === "Agregar Peliculas"
                  ? "/add-movie"
                  : "/admin-options"
              }
              className={`text-dark text-decoration-none ${
                option.disabled ? "disabled" : ""
              }`}
              onClick={(e) => option.disabled && e.preventDefault()}
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
