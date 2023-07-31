/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { handleDisableOption, handleGetAllOptions } from "../api/Api";

const AdminOptions = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const optionsFromApi = await handleGetAllOptions();
      setOptions(optionsFromApi);
    };
    getOptions();
  }, []);

  const handleButtonClick = async (optionId) => {
    try {
      await handleDisableOption(optionId);
    } catch (err) {
      console.error(err);
      console.error("Error submitting data:", err);
    }
  };

  return (
    <div>
      <h1 className="header">Todas las Opciones</h1>
      <div className="mt-5 mx-auto col-6">
        <div className="mb-3"></div>
        <table className="table table-striped">
          <thead>
            <tr className="table-primary">
              <th>Nombre</th>
              <th>Opcion</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option) => (
              <tr key={option.id}>
                <td>{option.name}</td>
                <td>
                  <button
                    className={`btn ${
                      option.disabled ? "btn-success" : "btn-danger"
                    }`}
                    onClick={() => handleButtonClick(option.id)}
                  >
                    {option.disabled ? "Habilitar Menu" : "Deshabilitar Menu"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOptions;
