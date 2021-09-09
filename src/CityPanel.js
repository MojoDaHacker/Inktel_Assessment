import { Card } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

// US cities database attribute
// https://simplemaps.com/data/us-cities

export default function CityPanel() {
  return (
    <Card>
      <Typeahead options={["Orlando", "Miami", "Fort Myers"]} />
      {/* <Form.Group>
        <Form.Control type="text" placeholder="City or Zip" />
      </Form.Group> */}
      <Card.Body>
        <p>Hello!</p>
      </Card.Body>
    </Card>
  );
}
