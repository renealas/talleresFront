import React from "react";

const AlertMessage = (props) => {
  console.log(props);
  return (
    <div
      className={`alert ${
        props.possitive ? "alert-success" : "alert-danger"
      } alert-dismissible fade show mt-5 mx-auto col-4`}
      role="alert"
    >
      <div className="d-flex justify-content-between align-items-center">
        <strong className="text-center flex-grow-1">{props.title}</strong>{" "}
        {/* Use text-center and flex-grow-1 classes here */}
        <button
          className="btn close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={props.function}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="text-center mt-2">
        {" "}
        {/* Use text-center class here */}
        {props.info}
      </div>
    </div>
  );
};

export default AlertMessage;
