// Sidebar.js
import React, { useEffect, useState } from "react";
import { handleGetAllOptions } from "../api/Api";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";

const Sidebar = () => {
  const [options, setOptions] = useState([]);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const getOptions = async () => {
      const optionsFromApi = await handleGetAllOptions();
      setOptions(optionsFromApi);
    };
    getOptions();
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const location = useLocation();

  const isActive = (path) => {
    path = path.replace(/\r?\n|\r/, "");
    path = path.replace(/ /g, "");
    path = path.replace(/\r?\n|\r/, "");
    return location.pathname === path ? "active" : "";
  };

  return (
    <div
      className={`sidebar bg-light ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="mr-5 ml-5">
        <button
          className="btn btn-primary toggle-btn"
          onClick={handleToggleSidebar}
        >
          {isSidebarCollapsed ? (
            <IonIcon icon={menu} size="large" className="mr-2" />
          ) : (
            "Cerrar Menu"
          )}
        </button>
        {!isSidebarCollapsed && (
          <ul className="list-unstyled list-menu">
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
                  } ${option.selected ? "active bg-primary" : ""}
                  ${isActive(`
                  ${
                    option.name === "Listado Peliculas"
                      ? "/"
                      : option.name === "Rentar Peliculas"
                      ? "/rent-movie"
                      : option.name === "Agregar Peliculas"
                      ? "/add-movie"
                      : "/admin-options"
                  }
                  `)}
                  `}
                  onClick={(e) => option.disabled && e.preventDefault()}
                >
                  {option.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
