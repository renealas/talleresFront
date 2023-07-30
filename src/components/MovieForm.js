import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleSubmit } from "../api/Api";
import AlertMessage from "./AlertMessage";

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const StyledDatePickerWrapper = styled.div`
  input {
    padding: 8px;
    border: 1px solid #ccc;
    width: 100%;
  }
`;

const Paragraph = styled.p`
  color: red;
  text-align: left;
`;

const MovieForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    duration: "",
    budget: "",
  });

  // Errors
  const [budgetError, setBudgetError] = useState("");
  const [dateError, setDateError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [nameError, setNameError] = useState("");

  //Save Result
  const [finishTransaction, setFinishTransaction] = useState(false);
  const [result, setResult] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const clearErrors = () => {
    setNameError("");
    setBudgetError("");
    setDateError("");
    setDurationError("");
  };

  const handleFormSubmit = async () => {
    clearErrors();

    const { budget, date, duration, name } = formData;

    if (budget.length === 0) {
      setBudgetError("Favor introdusca un Presupuesto");
    }

    if (budget.length > 0 && isNaN(budget)) {
      setBudgetError("El presupuesto debe ser numerico");
    }

    if (date.length === 0) {
      setDateError("Favor introdusca un fecha");
    }

    if (duration.length === 0) {
      setDurationError("Favor introdusca una duracion");
    }

    if (duration.length > 0 && isNaN(duration)) {
      setDurationError("La duracion debe ser numerico");
    }

    if (name.length === 0) {
      setNameError("Favor introdusca un nombre");
    }

    try {
      await handleSubmit(formData);
      setFinishTransaction(true);
      setResult(true);
    } catch (error) {
      console.error(error);
      console.error("Error submitting data:", error);
      setFinishTransaction(true);
      setResult(false);
    }
  };

  const dismissAll = () => {
    setFormData({
      name: "",
      date: "",
      duration: "",
      budget: "",
    });
    clearErrors();
    setFinishTransaction(false);
    setResult(false);
  };

  useEffect(() => {
    if (finishTransaction) {
      console.log("Automatic dismiss executed");
      setTimeout(() => {
        automaticDismiss();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishTransaction]);

  // automatic dismiss
  const automaticDismiss = () => {
    dismissAll();
  };

  return (
    <div>
      <h1 className="header">Películas</h1>
      {finishTransaction && result && (
        <AlertMessage
          possitive={true}
          title="Se agrego la pelicula"
          info="La Pelicula se agrego exitosamente."
          function={dismissAll}
        />
      )}
      {finishTransaction && !result && (
        <AlertMessage
          possitive={false}
          title="Error en agregar la pelicula"
          info="La Pelicula no pudo ser agregada."
          function={dismissAll}
        />
      )}
      <FormWrapper>
        <FormField>
          <Label>Nombre:</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {nameError && <Paragraph>{nameError}</Paragraph>}
        </FormField>
        <FormField>
          <Label>Fecha de estreno:</Label>
          <StyledDatePickerWrapper>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              name="date"
            />
          </StyledDatePickerWrapper>
          {dateError && <Paragraph>{dateError}</Paragraph>}
        </FormField>
        <FormField>
          <Label>Duración (minutos):</Label>
          <Input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
          {durationError && <Paragraph>{durationError}</Paragraph>}
        </FormField>
        <FormField>
          <Label>Presupuesto:</Label>
          <Input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
          {budgetError && <Paragraph>{budgetError}</Paragraph>}
        </FormField>
        <Button onClick={handleFormSubmit}>Guardar</Button>
      </FormWrapper>
    </div>
  );
};

export default MovieForm;
