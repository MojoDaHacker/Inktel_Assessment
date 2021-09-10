import { Container, Row, Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import SavedCities from "./SavedCities";

export default function Weather(props) {
  
  const cities = props.cities.map(val => val.cityName)

  return (
    <Container className="mt-3">
      <Row>
        <Col className="text-center">
          <p>City Weather Service</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typeahead
            open={true}
            maxResults={20}
            placeholder="Type a city..."
            id="typeahead"
            options={cities} 
            onChange={props.saveCity} 
          />
        </Col>
        <Col>
          <SavedCities savedCities={props.savedCities} />
        </Col>
      </Row>
    </Container>
  );
}
