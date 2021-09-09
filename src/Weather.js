import { Container, Row, Col, Form } from "react-bootstrap";
import CityPanel from "./CityPanel";
import SavedCities from "./SavedCities";

export default function Weather() {
  return (
    <Container className="mt-3">
      <Row>
        <Col className="text-center">
          <p>City Weather Service</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <CityPanel />
        </Col>
        <Col>
          <SavedCities />
        </Col>
      </Row>
    </Container>
  );
}
