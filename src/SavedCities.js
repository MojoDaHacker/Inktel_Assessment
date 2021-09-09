import { Card, ListGroup, Accordion } from "react-bootstrap";

export default function SavedCities({ savedCities }) {
  return (
    <Card>
      <Card.Header>
        <p>Filters</p>
      </Card.Header>
      <Card.Body>
        <Accordion>
          <Accordion.Item eventKey={0}>
            <Accordion.Header>Miami, FL</Accordion.Header>
            <Accordion.Body>It's Hot!</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={1}>
            <Accordion.Header>
              <span>Orlando, FL</span>
              <span>Sunny</span>
              <span>97</span>
            </Accordion.Header>
            <Accordion.Body>It's Hot!</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}
