import React from 'react'
import loading from "../assets/loading.gif";

export default function Loading() {
  return (
    <div className="div-fx-loading">
      <p>Loading... &nbsp;</p>
      <img src={loading} width="20%" />
    </div>
  );
}
