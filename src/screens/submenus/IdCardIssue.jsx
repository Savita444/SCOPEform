import React, { useState, useEffect, useRef } from "react";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import { useNavigate } from "react-router-dom";
import corner from "../imgs/file (28).png";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function IdCardIssue() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [technology_name, settechnology_name] = useState("");
  const [doj, setdoj] = useState("");
  const [contact_details, setcontact_details] = useState("");
  const [blood, setblood] = useState("");
  const [shirtsize, setshirtsize] = useState("");

  const [errors, setErrors] = useState({});

  const handlePrint = () => {
    window.print();
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.fname = "Name is required";
      isValid = false;
    }

    if (!contact_details) {
      errors.contact_details = "Contact number is required";
      isValid = false;
    } else if (!/^\+91\d{10}$/.test(contact_details)) {
      errors.contact_details =
        "Contact number must start with +91 and be followed by exactly 10 digits";
      isValid = false;
    }

    if (!doj) {
      errors.doj = "Date of Joining is required";
      isValid = false;
    }

    if (!blood.trim()) {
      errors.blood = "Blood group is required";
      isValid = false;
    }

    if (!technology_name.trim()) {
      errors.technology_name = "Technology name is required";
      isValid = false;
    } else if (technology_name.length > 100) {
      errors.technology_name =
        "Technology Name must be less than or equal to 50 characters";
      isValid = false;
    }

    // If any validation fails, update the errors state and set isValid to false
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors({});
      console.log("Form submitted successfully");
    }

    setErrors(errors);
    return isValid;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+91")) {
      setcontact_details(value.slice(0, 13)); // Limit to "+91" and 10 digits
    } else {
      setcontact_details("+91" + value.slice(0, 10));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation (you can add your validation logic here)
    const isValid = validateForm();
    if (!isValid) {
      alert("Please fill in all the required fields correctly.");
      return; // Exit the function if validation fails
    }

    const token = localStorage.getItem("remember_token");

    // Prepare the form data
    const newData = {
      name,
      contact_details,
      doj,
      blood,
      technology_name,
      shirtsize,
    };

    try {
      const response = await fetch(
        "https://api.sumagotraining.in/public/api/Idcardissue/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
          body: JSON.stringify(newData),
        }
      );

      // Parse the response JSON
      const responseData = await response.json();

      if (response.ok) {
        // If submission is successful
        alert("Data submitted successfully!");
        // navigate("/viewinterjoining"); // Navigate after success
        console.log("Response Data:", responseData);
      } else {
        // Handle validation errors or other issues from the server
        if (responseData.errors) {
          const errorMessages = Object.values(responseData.errors)
            .flat()
            .join("\n");
          alert(`Failed to submit data:\n${errorMessages}`);
        } else {
          alert("Failed to submit data. Please try again.");
        }
        console.error("Error Response:", responseData);
      }
    } catch (error) {
      // Handle unexpected errors
      alert("An error occurred while submitting data.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container backimg ">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} class="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text">
              ID CARD ISSUE <span className="highlight">FORM</span>
            </b>
          </div>
        </Container>

        <div style={{ margin: "40px" }}></div>

        {/* Form Personal Details */}

        <Form onSubmit={handleSubmit}>
          <Container fluid>
            <Card style={{ backgroundColor: "transparent", border: "none" }}>
              <Card.Header
                className="cardpersonal_details"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  className="position-absolute"
                  style={{
                    backgroundColor: "black",
                    width: "20px",
                    height: "30px",
                  }}
                >
                  <div className="personal-card-heading position-relative">
                    <b className="form-title">ID CARD DETAILS</b>
                  </div>
                </div>
              </Card.Header>
              <Card.Body
                style={{ backgroundColor: "transparent", color: "white" }}
                className="pt-5"
              >
                <Card.Title className="text-black"></Card.Title>
                <Card.Text className="text-black">
                  <Row>
                    <Col lg={2} md={2} sm={12} className="mt-3">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Name of Intern :{" "}
                      </b>
                    </Col>
                    <Col lg={10} md={10} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          className="FormStyeling transparent-input"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </Form.Group>
                      {errors.name && (
                        <span className="error text-danger">{errors.name}</span>
                      )}
                    </Col>

                    <Col lg={2} md={12} sm={10}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Technology Name
                      </b>
                    </Col>
                    <Col lg={4} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={technology_name}
                          onChange={(e) => settechnology_name(e.target.value)}
                        >
                          <option>Select Technology</option>
                          <option value="MERN Stack Development">
                            MERN Stack Development
                          </option>
                          <option value="MEAN Stack Development">
                            MEAN Stack Development
                          </option>
                          <option value="Full Stack Java Development">
                            Full Stack Java Development
                          </option>
                          <option value="Python Development ">
                            Python Development{" "}
                          </option>
                          <option value="AWS Devops">AWS Devops</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="AIML">AIML</option>
                          <option value="UI-UX Designing">
                            UI-UX Designing
                          </option>
                          <option value="Software Testing">
                            Software Testing
                          </option>
                        </Form.Select>
                      </Form.Group>
                      {errors.technology_name && (
                        <span className="error text-danger">
                          {errors.technology_name}
                        </span>
                      )}
                    </Col>

                    <Col lg={1} md={2} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Date Of Joining
                      </b>
                    </Col>
                    <Col lg={5} md={5} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="date"
                          className="FormStyeling transparent-input"
                          value={doj}
                          onChange={(e) => setdoj(e.target.value)}
                        />
                      </Form.Group>
                      {errors.doj && (
                        <span className="error text-danger">{errors.doj}</span>
                      )}
                    </Col>

                    <Col lg={2} md={12} sm={10}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Contact Details
                      </b>
                    </Col>
                    <Col lg={4} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="+91"
                          className="FormStyeling transparent-input"
                          value={contact_details}
                          onChange={handlePhoneChange}
                        />
                      </Form.Group>
                      {errors.contact_details && (
                        <span className="error text-danger">
                          {errors.contact_details}
                        </span>
                      )}
                    </Col>

                    <Col lg={1} md={2} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Blood Group
                      </b>
                    </Col>
                    <Col lg={5} md={5} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={blood}
                          onChange={(e) => setblood(e.target.value)}
                        >
                          <option>Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.blood && (
                        <span className="error text-danger">
                          {errors.blood}
                        </span>
                      )}
                    </Col>

                    <Col lg={2} md={12} sm={10}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        T-Shirt Size
                      </b>
                    </Col>
                    <Col lg={4} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          className="FormStyeling transparent-input"
                          value={shirtsize}
                          onChange={(e) => setshirtsize(e.target.value)}
                        >
                          <option>Select T-Shirt Size</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL ">XXL</option>
                          <option value="Free Size ">Free Size</option>
                        </Form.Select>
                      </Form.Group>
                      {errors.shirtsize && (
                        <span className="error text-danger">
                          {errors.shirtsize}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>

          <div className="button-container">
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#28a745",
                borderColor: "#28a745",
                marginRight: "10px",
              }}
            >
              Submit
            </Button>

            <Button
              variant="primary"
              onClick={handlePrint}
              style={{
                backgroundColor: "#17a2b8",
                borderColor: "#17a2b8",
              }}
            >
              Print
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default IdCardIssue;
