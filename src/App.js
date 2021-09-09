import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./styles.css";
import { useState } from "react";
import Login from "./Login";
import Weather from "./Weather";

export default function App() {
  const [savedCities, setSavedCities] = useState([]);

  return (
    // <Login />

    <Weather savedCities={savedCities} />
  );
}
