import React from "react";

function getStatusString(status) {
  if (status === 0) {
    return "Failed";
  } else if (status === 4) {
    return "Trial";
  } else if (status === 5) {
    return "Pending";
  } else if (status === 10) {
    return "Completed";
  } else {
    return "";
  }
}

function StatusButton(props) {
  const { status } = props;
  const statusString = getStatusString(status);

  let btnStyle = {};

  if (status === 0) {
    btnStyle = {
      backgroundColor: "red",
      color: "white",
      padding: "4px 12px",
      borderRadius: "8px",
    };
  } else if (status === 4) {
    btnStyle = {
      backgroundColor: "#0E86D4",
      color: "white",
      padding: "4px 12px",
      borderRadius: "8px",
    };
  } else if (status === 5) {
    btnStyle = {
      backgroundColor: "orange",
      color: "white",
      padding: "4px 12px",
      borderRadius: "8px",
    };
  } else if (status === 10) {
    btnStyle = {
      backgroundColor: "green",
      color: "white",
      padding: "4px 12px",
      borderRadius: "8px",
    };
  }

  btnStyle.cursor = "default";

  return <button style={btnStyle}>{statusString}</button>;
}

export default StatusButton;

export const statusOptions = [
  { value: "", label: "All" },
  { value: "0", label: "Failed" },
  { value: "4", label: "Trial" },
  { value: "5", label: "Pending" },
  { value: "10", label: "Completed" },
];
