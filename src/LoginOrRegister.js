import { useState } from "react"
import { Col, Container, Button, Form, Row } from "react-bootstrap"

const initialState = {
  login: true,
  username: "",
  password: "",
} 

const LoginOrRegister = ({ login, register }) => {
  const [state, setState] = useState(initialState)
  const changeLoginOrRegister = () => setState(prevState => ({ ...initialState, login: !prevState.login }))
  const handleInputChange = e => setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  const doLoginOrRegister = () => {
    if(!state.username || !state.password) return setState({ ...state, errMessage: "Username or Password cannot be empty!" })

    const operation = state.login ?
        login({
          username: state.username,
          password: state.password
        })
      :
        register({
          username: state.username,
          password: state.password
        })

    if(operation === false) setState({ ...initialState, login: state.login, errMessage : state.login ? "No user found with given credentials!" : "You already have an account..." })
    else setState({ ...initialState, success: true })
  }

  return (
    <Container className="mt-4">
      <Row  className="justify-content-center">
        <Col md={6} xl={4}>
          <Form>
            <Form.Group className="my-2">
              <Form.Label>{state.login ? null : "Create"} Username</Form.Label>
              <Form.Control isInvalid={state.errMessage !== undefined} onChange={handleInputChange} name="username" type="text" value={state.username} />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>{state.login ? null : "Create"} Password</Form.Label>
              <Form.Control isInvalid={state.errMessage !== undefined} onChange={handleInputChange} name="password" type="password" value={state.password}/>
              <Form.Control.Feedback className="text-center" type="invalid">{state.errMessage}</Form.Control.Feedback>
              {state.success ? <p className="text-success text-center m-2">Registration Succesful</p> : null }
            </Form.Group>
            <Form.Group className="text-center m-3">
              <Button onClick={doLoginOrRegister}>{state.login ? "Login" : "Register"}</Button>
              <Button onClick={changeLoginOrRegister} variant="link">{state.login ? "Don't have an account" : "Already have an account"}</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginOrRegister