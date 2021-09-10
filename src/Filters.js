import { DropdownButton, Dropdown, FormGroup, FormLabel, ButtonGroup, ToggleButton } from "react-bootstrap"
import RangeSlider from "react-bootstrap-range-slider"

const Filters = props => {
  const [filterState, changeFilterValue, changeFilterOperation, changeWeatherStatus] = props.filterState
  const handleRangeChange = e => changeFilterValue({ id: e.target.name, val: e.target.value })
  const handleFilterChange = e => {
    let key = e.currentTarget.control.name
    let val = e.currentTarget.control.value

    changeFilterOperation({ id: key, val: filterState[key][0] === 3 ? undefined : val })
  }
  const handleWeatherStatusChange = (e) => {
    console.log(e)
    changeWeatherStatus({ id: "weatherStatus", val: e })
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1 text-center">
        <DropdownButton title={filterState.weatherStatus} onSelect={handleWeatherStatusChange}>
          <Dropdown.Item eventKey="All" as="button">All</Dropdown.Item>
          <Dropdown.Item eventKey="Clear" as="button">Clear</Dropdown.Item>
          <Dropdown.Item eventKey="Clouds" as="button">Clouds</Dropdown.Item>
          <Dropdown.Item eventKey="Storms" as="button">Storms</Dropdown.Item>
          <Dropdown.Item eventKey="Drizzle" as="button">Drizzle</Dropdown.Item>
          <Dropdown.Item eventKey="Rain" as="button">Rain</Dropdown.Item>
          <Dropdown.Item eventKey="Snow" as="button">Snow</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="flex-grow-1">
        {["temp", "min", "max"].map((val, i) => (
          <FormGroup key={i}>
            <FormLabel>
              {!i ? "Temperature" : 
                i === 1 ? "Min" : "Max" }
            </FormLabel>
            <ButtonGroup size="sm" className="float-end">
              <ToggleButton name={val} active={filterState[val][0] === 0} id={`${val + 0}`} disabled={filterState[val][0] === 3} onClick={handleFilterChange} value={0} variant="primary" className="border text-info">&lt;</ToggleButton>
              <ToggleButton name={val} active={filterState[val][0] === 1} id={`${val + 1}`} disabled={filterState[val][0] === 3} onClick={handleFilterChange} value={1} variant="primary" className="border text-info">=</ToggleButton>
              <ToggleButton name={val} active={filterState[val][0] === 2} id={`${val + 2}`} disabled={filterState[val][0] === 3} onClick={handleFilterChange} value={2} variant="primary" className="border text-info">&gt;</ToggleButton>
              <ToggleButton name={val} active={filterState[val][0] === 3} id={`${val + 3}`} value={3} onClick={handleFilterChange} variant="primary" className="border text-info">{filterState[val][0] === 3 ? "Off" : "On"}</ToggleButton>
            </ButtonGroup>
            <RangeSlider disabled={filterState[val][0] === 3} name={val} onChange={handleRangeChange} value={filterState[val][1]}/>
          </FormGroup>
        ))}
      </div>
    </div>
  )
}

export default Filters
