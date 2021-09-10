import React, { useMemo, useState } from "react";
import { useTable, useFilters } from "react-table";
import { Card, Accordion, Container, Row, Col } from "react-bootstrap";
import Filters from "./Filters.js"


export default function SavedCities({ savedCities }) {
  const [filterState, setFilterState] = useState({
    weatherStatus: "All",
    temp: [3,75],
    min: [3,25],
    max: [3,50],
  })
  const changeWeatherStatus = ({ id, val }) => {  
    setFilterState({ ...filterState, [id]: val })
    setFilter(id, val)
  }
  const changeFilterValue = ({ id, val }) => {
    let newArr = [...filterState[id]]
    newArr[1] = val
    
    setFilterState({ ...filterState, [id]: newArr })
    setFilter(id, val)
  }
  const changeFilterOperation = ({ id, val = 0 }) => {
    let newArr = [...filterState[id]]
    newArr[0] = +val
    
    setFilterState({ ...filterState, [id]: newArr })
  }
  function chooseFilterType(rows, [id], filterValue){
    if(id === "weatherStatus"){
      return filterState["weatherStatus"] === "All" ? rows : (
        rows.filter(row => row.values[id] === filterValue)
      )
    }
    else {
      switch (filterState[id][0]) {
        case 0:
          return filterLessThan(...arguments)
        case 1:
          return "equal"
        case 2:
          return filterGreaterThan(...arguments)
        default:
          return rows
      }
    }
  }
  function filterGreaterThan(rows, [id], filterValue) {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }
  function filterLessThan(rows, [id], filterValue) {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue <= filterValue
    })
  }
  const data = useMemo(() => savedCities, [savedCities])
  const columns = useMemo(() => [
    { accessor: "cityName", id: "city" },
    { accessor: "weatherData.weather[0].main", id: "weatherStatus", filter: "chooseFilterType" },
    { accessor: "weatherData.main.temp", id: "temp", filter: "chooseFilterType" },
    { accessor: "weatherData.main.temp_min", id: "min", filter: "chooseFilterType" },
    { accessor: "weatherData.main.temp_max", id: "max", filter: "chooseFilterType" },
  ], [])
  const {
    rows,
    preFilteredRows,
    prepareRow,
    setFilter,
    state
  } = useTable(
    {
      columns,
      data,
      filterTypes: useMemo(() => ({ chooseFilterType }), [filterState]),
      initialState: useMemo(() => ({ filters: [{ id:"weatherStatus", value: "All" }]}), []),
    },
    useFilters
  )

  return (
    <Card>
      <Card.Header>
        <Filters filterState={[filterState, changeFilterValue, changeFilterOperation, changeWeatherStatus]}/>
      </Card.Header>
      <Card.Body>
        {!savedCities.length ? (
          <p className="text-center">You haven't saved any cities yet!</p>
        ) : (
          <Accordion>
            {rows.map(row => {
              const { original } = row;
              prepareRow(row)
              return (
                <Accordion.Item key={`city${row.id}`} eventKey={row.id}>
                  <Accordion.Header>{original.cityName}</Accordion.Header>
                  <Accordion.Body>
                    {!original.weatherData ? (
                      <p className="text-danger text-center">Weather data on this city could not be fetched!</p>
                    ) : (
                      <Container>
                        <Row>
                          <Col>
                            <p>Main: {original.weatherData.weather[0].main}</p>
                            <p>Description: {original.weatherData.weather[0].description}</p>
                          </Col>
                          <Col>
                            <p>Main Temperature: {Math.floor(original.weatherData.main.temp)}</p>
                            <p>Min: {Math.floor(original.weatherData.main.temp_min)}</p>
                            <p>Max: {Math.floor(original.weatherData.main.temp_max)}</p>
                          </Col>
                        </Row>
                      </Container>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              )
            })}
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );
}