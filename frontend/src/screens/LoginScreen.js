import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //POSSIBLE CAUSE OF FUTURE ERROR --> SHOULD BE : "/"
  const redirect = location.search ? location.search.split("=")[1] : "/"; //ex: if ?user=arvil take arvil. Else just stay at /login

  useEffect(() => {
    //if user is logged in
    if (userInfo) {
      history.push(redirect); //push what we got in redirect to url (arvil)
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault(); //so page doesn't refresh
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <br />
      <br />
      <br />

      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {/* email */}
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            className="mt-1 mb-3"
            size="sm"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* password */}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="mt-1 mb-3"
            size="sm"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* sign in button */}
        <Button
          type="submit"
          variant="primary"
          style={{ fontSize: 16, borderRadius: 3 }}
        >
          Sign In
        </Button>
      </Form>

      <Row className="py-3" style={{ fontSize: 12 }}>
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
