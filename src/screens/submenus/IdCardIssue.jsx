import React, { useState, useEffect, useRef } from "react";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import corner from "../imgs/file (28).png";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

function IdCardIssue() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stude_id: id,
    name: "",
    technology: "",
    date_of_joining: "",
    contact_details: "",
    blood_group: "",
    shirt_size: "",
  });
  console.log("id", id);


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("remember_token");
        const response = await axios.get(
          `https://api.sumagotraining.in/public/api/get-perticular-intern-by-studId/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        // console.log(data[0].fname);


        if (data) {
          setFormData({
            name: `${data[0].fname} ${data[0].fathername || ""} ${data[0].lname || ""}`.trim(),
            technology: data[0].technology_name,
            contact_details: data[0].contact_details,
            date_of_joining: data[0].date_of_joining,
            blood_group: data[0].blood
          })
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        alert("Failed to load data. Please try again.");
      }
    };

    fetchDetails();
  }, [id]);



  const handlePrint = () => {
    window.print();
  };

  const validate = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name) errors.name = "Name is required";

    if (!formData.technology) {
      errors.technology = "Technology is required";
    }
    if (!formData.contact_details) {
      errors.contact_details = "contact details is required";
    }
    // if (!formData.date_of_joining) {
    //   errors.date_of_joining = "date of joining is required";
    // }
    if (!formData.shirt_size) {
      errors.shirt_size = "Shirt size is required";
    }
    if (!formData.blood_group) {
      errors.blood_group = "blood_group group is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;


    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ["stude_id"]: id
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (you can add your validation logic here)
    const isValid = validate();
    if (!isValid) {
      alert("Please fill in all the required fields correctly.");
      return; // Exit the function if validation fails
    }

    setIsSubmitting(true);

    if (validate()) {
      try {
        const token = localStorage.getItem("remember_token");
        // const id = localStorage.getItem("id");

        // const formDataToSubmit = new FormData();
        // Object.keys(formData).forEach((key) => {
        //   console.log("key0", key);

        // });

        // console.log("formData", formData);

        const response = await axios.post(
          "https://api.sumagotraining.in/public/api/intern-id-card/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response, "response.data.successresponse.data.success");

        if (response) {

          alert("Data submitted successfully!");
          navigate("/ViewIdCard");
        } else {
          alert("Submission failed. Please try again.");
        }

        console.log("API Response:", response.data);
      } catch (error) {
        console.error("API Error:", error);
        alert("An error occurred while submitting the form");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      focusFirstInvalidField();
    }
  };

  return (
    <>
      <div className="container idcardbackimg ">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"

        >
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
                    {/* First Row */}
                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <b style={{ fontFamily: "Century Gothic" }}>Name:</b>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                          <Form.Group controlId="name">
                            <Form.Control
                              type="text"
                              className="FormStyeling transparent-input"
                              value={formData.name}
                              onChange={handleInputChange}
                              name="name"
                              readOnly
                            />
                          </Form.Group>
                          {errors.name && <span className="error text-danger">{errors.name}</span>}
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <b style={{ fontFamily: "Century Gothic" }}>Technology Name:</b>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                          <Form.Group controlId="technology">
                            <Form.Control
                              type="text"
                              className="FormStyeling transparent-input"
                              value={formData.technology}
                              onChange={handleInputChange}
                              name="technology"
                              readOnly
                            />
                          </Form.Group>
                          {errors.technology && (
                            <span className="error text-danger">{errors.technology}</span>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    {/* Second Row */}
                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <b style={{ fontFamily: "Century Gothic" }}>Date Of Joining:</b>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                          <Form.Group controlId="date_of_joining">
                            <Form.Control
                              type="date"
                              className="FormStyeling transparent-input"
                              value={formData.date_of_joining}
                              onChange={handleInputChange}
                              name="date_of_joining"
                              readOnly
                            />
                          </Form.Group>
                          {errors.date_of_joining && (
                            <span className="error text-danger">{errors.date_of_joining}</span>
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <b style={{ fontFamily: "Century Gothic" }}>Contact Details:</b>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                          <Form.Group controlId="contact_details">
                            <Form.Control
                              type="text"
                              className="FormStyeling transparent-input"
                              value={formData.contact_details}
                              onChange={handleInputChange}
                              name="contact_details"
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    {/* Third Row */}
                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <b style={{ fontFamily: "Century Gothic" }}>Blood Group:</b>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                          <Form.Group controlId="blood_group">
                            <Form.Control
                              type="text"
                              className="FormStyeling transparent-input"
                              value={formData.blood_group}
                              onChange={handleInputChange}
                              name="blood_group"
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <b style={{ fontFamily: "Century Gothic" }}>T-Shirt Size:</b>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                          <Form.Group controlId="shirt_size">
                            <Form.Select
                              className="FormStyeling transparent-input"
                              value={formData.shirt_size}
                              onChange={handleInputChange}
                              name="shirt_size"
                            >
                              <option>Select T-Shirt Size</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                              <option value="Free Size">Free Size</option>
                            </Form.Select>
                          </Form.Group>
                          {errors.shirt_size && (
                            <span className="error text-danger">{errors.shirt_size}</span>
                          )}
                        </Col>
                      </Row>
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
              disabled={isSubmitting} // Disable button while submitting
              style={{
                backgroundColor: "#28a745",
                borderColor: "#28a745",
                marginRight: "10px",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}{" "}
              {/* Text changes based on isSubmitting */}
            </Button>

            <Button
              variant="primary"
              onClick={handlePrint}
              style={{
                backgroundColor: "#17a2b8",
                borderColor: "#17a2b8",
              }} // Change to your desired color
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
