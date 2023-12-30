import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [ShowSignIn, setShowSignIn] = useState(true);

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:8081/api/signin", {
          params: {
              username,
              password,
          },
      });
  
      if (response.data.success) {
          setError(null);
          navigate('/');
          onSignIn(username);
          
      } else {
          setError("Invalid username or password");
      }
  } catch (error) {
      console.error("Error during login:", error.message);
      setError("An error occurred during login");
  }
  };  

  return (
    <Container>
      {ShowSignIn && (
        <Form onSubmit={handleSubmitSignIn} className="mt-5">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default SignIn;
