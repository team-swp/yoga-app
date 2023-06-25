import React from "react";

function getStatusString(status) {
    if (status === null) {
        return "Failed";
    } else if (status === true) {
        return "Enabled";
    } else if (status === false) {
        return "Disabled";
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
    } else if (status === false) {
        btnStyle = {
            backgroundColor: "red",
            color: "white",
            padding: "4px 12px",
            borderRadius: "8px",
        };
    } else if (status === true) {
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