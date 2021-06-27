import React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "../routes";
// Fontawesome vendor import
import "@fortawesome/fontawesome-free/css/regular.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
// Bootstrap css (Used for Modal in this project)
import "bootstrap/dist/css/bootstrap.css";

function App() {
  // Introcuding router at the entry of the application
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
}

export default App;
