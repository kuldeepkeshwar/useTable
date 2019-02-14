import React from "react";
import "./loader.scss";

export default function(props) {
  return (
    <div className={`loader-container ${props.className}`}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
