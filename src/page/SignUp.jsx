import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/signup", {
        params: {
          username,
          email,
          password,
        },
      });

      if (response.data.success) {
        setError(null);
        navigate("/");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.log("Error during registration:", error.message);
      setError("An error occurred during registration");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmitSignUp} className="mt-5">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
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
            aria-label="Password"
          />
          {/* Consider adding additional information about password requirements here */}
        </Form.Group>

        <Form.Group controlId="formBasicWeight">
          <Form.Label>Weight in KG</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your weight in kilograms"
            value={weight}
            name="weight"
            onChange={(e) => setWeight(e.target.value)}
            required
            aria-label="Weight"
          />
        </Form.Group>

        <Form.Group controlId="formBasicHeight">
          <Form.Label>Height in cm</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your height in centimeters"
            value={height}
            name="height"
            onChange={(e) => setHeight(e.target.value)}
            required
            aria-label="Height"
          />
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            name="gender"
            required
            aria-label="Gender"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Form.Control>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
