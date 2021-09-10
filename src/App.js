import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./styles.css";
import cities from "./us_cities.json"
import { useState } from "react";
import Login from "./LoginOrRegister";
import Weather from "./Weather";

export default function App() {
  const [usersRegistered, setUsersRegistered] = useState([
    {
      username: "support",
      password: "support",
    }
  ])
  const [isAuthenticated, setAuthentication] = useState(true)
  const [savedCities, setSavedCities] = useState([]);
  const miniCities = cities.map(val => ({
    cityName: val.city,
    stateID: val.state_id,
    stateName: val.state_name,
    lat: val.lat,
    lng: val.lng,
  }))
  const saveCity = ([ city ]) => {
    if(!city) return
    // fetch weather data for city
    // save city to the saveCities state with is weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3abd9c2df6a249e8abcf4f812de0a627&units=imperial`)
    .then((res) => res.json())
    .then(data => {
      const newCity = miniCities.find(cityObj => cityObj.cityName === city)
      return setSavedCities([...savedCities, {
        ...newCity,
        weatherData : data 
      }])
    })
    .catch(setSavedCities([...savedCities, { city, err : true }]))
  }

  const login = user => {
    const found = usersRegistered.find(val => val.username === user.username && val.password === user.password)
    if(!found) return false
    setAuthentication(!isAuthenticated)
  }
  const register = user => {
    const found = usersRegistered.find(val => val.username === user.username && val.password === user.password)
    if(found) return false
    setUsersRegistered([ ...usersRegistered, user ])
  }

  return isAuthenticated ? (
    <Weather cities={miniCities} savedCities={savedCities} saveCity={saveCity} />
  ) : (
    <Login login={login} register={register}  />
  );
}
