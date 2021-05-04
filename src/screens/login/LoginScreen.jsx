import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import "./login.css";
import { Row, Col, Container, Form, Button, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/authAction";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo !== null) {
      history.push("/");
    }
  }, [userInfo]);

  return (
    <Container className="login">
      <div className="shadow">
        <Row className="justify-content-md-center align-items-center">
          <Col lg={5} md={6} sm={5}>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>EMAIL ADDRESS</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" size="sm" type="submit">
                LOGIN
              </Button>
            </Form>
          </Col>
          <Col lg={5} md={5} sm={6} xs={12}>
            <div className="text-center">
              <Image
                width={400}
                height={400}
                src={require("../../assets/logo.jpg")}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoginScreen;
