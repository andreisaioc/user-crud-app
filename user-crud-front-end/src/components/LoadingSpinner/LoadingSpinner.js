import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner({centered}) {

  var classCenter = ""
  if(centered == 1)  classCenter = "centered1"

  return (
    <div className="spinner-container">
      <div className={classCenter}>
      <div className="loading-spinner"></div></div>
    </div>
  );
}