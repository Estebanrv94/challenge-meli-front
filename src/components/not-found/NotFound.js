import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.scss";


const NotFound = () => (
  <div className="error">
    <h1>Página no encontrada</h1>
    <h2 className="e404">Error 404</h2>
    <button component={Link} type="button" to="/" >
      Ir al inicio
    </button>
  </div>
);

export default NotFound;
