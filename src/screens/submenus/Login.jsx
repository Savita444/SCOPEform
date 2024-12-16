

////sos final

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Image, InputGroup } from "react-bootstrap";
import instance from "../../api/AxiosInstance";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from "../../assets/images/L1.png";
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://api.sumagotraining.in/public/api/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // if (response.data.result) {
        //   const { token } = response.data.responseData;
          
        //   localStorage.setItem("remember_token", token);
        //   toast.success("Login successful");
        //   navigate("/interjoining");
        // } 
        console.log(response.data, "ssssssssssssssss");
        if (response.data) {
          // Log the entire response data for debugging
          console.log("Login response:", response.data);
      
          // Extract the token from the response
          const token = response.data.access_token;
          const id = response.data.user.id;
          // console.log(response.data.user.id, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
          
          // Set the token in localStorage
          localStorage.setItem("remember_token", token);
          localStorage.setItem("access_token", token);
          localStorage.setItem("id", id);
      
          // Log the token to confirm it was set correctly
          console.log("Token received and stored:", token);
      
          // Show success message and navigate to the desired page
          toast.success("Login successful");
          navigate("/interjoining");
      }
      
      
        else {
          // Handle server-side error messages
          const errorMessage = response.data.message || "Login failed";
          toast.error(errorMessage);
        }
      } catch (error) {
        // Handle unexpected errors (like network issues or server down)
        if (error.response) {
          // The request was made and the server responded with a status code
          const status = error.response.status;
          if (status === 401) {
            toast.error("Please Enter correct Password");
          } else if (status === 404) {
            toast.error("Resource not found.");
          } else if (status === 500) {
            toast.error("Internal server error.");
          } else {
            // Handle other status codes as needed
            toast.error("An error occurred. Please try again.");
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error handling form submission:", error);
          toast.error("Error in Submit"); // General error message for unexpected issues
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-4 p-md-5 bg-white">
              <Row className="align-items-center mb-4">
                <Col xs={12} className="text-center mb-3">
                  <Image src={logo} alt="Logo" fluid style={{ maxWidth: "150px", width: "100%" }} />
                </Col>
                <Col xs={12}>
                  <h3 className="text-center text-primary font-weight-bold"></h3>
                </Col>
              </Row>

              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#007bff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <FaUser className="me-2 text-secondary" />
                      Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-light border-0 shadow-sm rounded-pill px-3"
                    />
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <FaLock className="me-2 text-secondary" />
                      Password
                    </Form.Label>
                    <InputGroup className="bg-light border-0 shadow-sm rounded-pill">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-0 px-3 rounded-pill"
                      />
                      <InputGroup.Text
                        className="bg-light border-0 rounded-pill"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </Form.Group>

                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <Button
                        // variant="primary"
                        type="submit"
                        className="mt-4 py-2 px-5 rounded-pill shadow-lg clr"
                        style={{ border: "none" }}
                        disabled={loading}
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;