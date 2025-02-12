import React, { useState, useEffect } from "react";
import "./InterJoining.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import corner from "../imgs/file (28).png";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

function UpdatePersonalDetails() {
  const navigate = useNavigate();
  const [id, setid] = useState("");
  const [fname, setfname] = useState("");
  const [mname, setmname] = useState("");
  const [fathername, setfathername] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [parmanenat_address, setparmanenat_address] = useState("");
  const [current_address, setcurrent_address] = useState("");
  const [contact_details, setcontact_details] = useState("");
  const [whatsappno, setwhatsappno] = useState("");
  const [dob, setdob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setgender] = useState("");
  const [blood, setblood] = useState("");
  const [aadhar, setaadhar] = useState("");
  const [errors, setErrors] = useState({});


  const location = useLocation(); // Access the current location object

  useEffect(() => {
    if (location) {
      console.log("location?.state", location?.state); // Logs the state passed in the location object for debugging
      setid(location?.state?.id || "");
      // Set state variables with values from location.state or default to an empty string
      setfname(location?.state?.fname || "");
      setmname(location?.state?.mname || "");
      setfathername(location?.state?.fathername || "");
      setlname(location?.state?.lname || "");
      setemail(location?.state?.email || "");
      setparmanenat_address(location?.state?.parmanenat_address || "");
      setcurrent_address(location?.state?.current_address || "");
      setcontact_details(location?.state?.contact_details || "");
      setwhatsappno(location?.state?.whatsappno || "");
      setdob(location?.state?.dob || "");
      setAge(location?.state?.Age || "");
      setgender(location?.state?.gender || ""); 
      setblood(location?.state?.blood || "");
      setaadhar(location?.state?.aadhar || "");
    }
  }, [location]);




  useEffect(() => {
    if (dob) {
      setAge(calculateAge(dob));
    } else {
      setAge("");
    }
  }, [dob]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+91")) {
      setcontact_details(value.slice(0, 13)); // Limit to "+91" and 10 digits
    } else {
      setcontact_details("+91" + value.slice(0, 10));
    }
  };

  const handleWhatsappChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+91")) {
      setwhatsappno(value.slice(0, 13)); // Limit to "+91" and 10 digits
    } else {
      setwhatsappno("+91" + value.slice(0, 10));
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;

    // Check if the input is a number and has exactly 12 digits
    if (/^\d{0,12}$/.test(value)) {
      setaadhar(value);
      // Clear error if input is valid
      if (value.length === 12) {
        setErrors((prevErrors) => ({ ...prevErrors, aadhar: null }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          aadhar: "Aadhar number must be exactly 12 digits.",
        }));
      }
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months, ${days} days`;
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!fname.trim()) {
      errors.fname = "First Name is required";
      isValid = false;
    }
    if (!mname.trim()) {
      errors.mname = "Mother Name is required";
      isValid = false;
    }
    if (!fathername.trim()) {
      errors.fathername = "Father Name is required";
      isValid = false;
    }
    if (!lname.trim()) {
      errors.lname = "Last Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }
    if (!parmanenat_address.trim()) {
      errors.parmanenat_address = "Permanent address is required";
      isValid = false;
    } else if (parmanenat_address.length > 255) {
      errors.parmanenat_address =
        "Permanent address cannot exceed 255 characters";
      isValid = false;
    }
    if (!current_address.trim()) {
      errors.current_address = "Current address is required";
      isValid = false;
    } else if (current_address.length > 255) {
      errors.current_address = "Current address cannot exceed 255 characters";
      isValid = false;
    }
    if (!contact_details) {
      errors.contact_details = "Contact number is required";
      isValid = false;
    } else if (!/^\+91\d{10}$/.test(contact_details)) {
      errors.contact_details =
        "Contact number must start with +91 and have 10 digits";
      isValid = false;
    }
    if (!dob) {
      errors.dob = "Date of Birth is required";
      isValid = false;
    }
    if (!gender) {
      errors.gender = "Please select your Gender";
      isValid = false;
    }
    if (!blood.trim()) {
      errors.blood = "Blood group is required";
      isValid = false;
    }
    if (!aadhar || aadhar.length == 12) {
      errors.aadhar = "Aadhar number must be exactly 12 digits";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("remember_token");
    const newData = {
      fname,
      mname,
      fathername,
      lname,
      email,
      parmanenat_address,
      current_address,
      whatsappno,
      contact_details,
      dob,
      age,
      gender,
      blood,
      aadhar:aadhar.toString(),
    };

    axios.post(
      `https://api.sumagotraining.in/public/api/update-intern-personal-info/update/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((result) => {
        alert("Data updated successfully!");
        navigate("/viewinterjoining");

      })
      .catch((err) => {
        console.log("err", err);
      });
    
  };



  return (
    <>
      <div className="container backimg ">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} class="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text">
              UPDATE INTERNS <span className="highlight">PERSONAL</span>  DETAILS
            </b>
          </div>
        </Container>
        {/* <Container className="position-relative text-center homepara">
          <p>
            SCOPE , where we believe in empowering individuals through education
            and skill development. Established with a vision to foster
            excellence and innovation in learning, Scope is dedicated to
            providing high-quality training programs tailored to meet the
            diverse needs of our students.
          </p>
        </Container> */}

        {/* <Container className="position-relative text-center welcommsg">
          <p>
            <b>Welcome</b> To <b>Sumago Center of Practical Experience!!</b>
          </p>
        </Container> */}

        {/* <Container className="position-relative text-center para2">
          <p style={{ textAlign: "justify" }}>
            We’re glad to have you on board as part of our intern team. Get
            ready to dive into hands-on learning, sharpen your skills, and make
            meaningful contributions. Let’s make this journey both rewarding and
            memorable!
          </p>
        </Container>
        <div style={{ margin: "40px" }}></div> */}

        {/* Form Personal Details */}

        <Form onSubmit={handleSubmit}>
          <Container fluid>
            {/* <Card className="transparent-card">
                               <Card.Header className="cardpersonal_details">
                                   <div className="position-absolute" style={{ backgroundColor: 'black', width: '20px', height: '30px' }}>
                                       <div className="personal-card-heading position-relative">
                                           <b>PERSONAL DETAILS</b>
                                       </div>
                                   </div>
                               </Card.Header> */}
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
                    <b className="form-title">PERSONAL DETAILS</b>
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
                    {/* First name */}
                    <Col lg={4}>
                      <b
                        style={{ fontFamily: "Century gothic" }}
                        className="d-none d-md-block"
                      >
                        First Name{" "}
                      </b>
                    </Col>
                    <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={fname}
                          // onChange={handleChange}
                          onChange={(e) => setfname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.fname ? (
                          <span className="error text-danger">
                            {errors.fname}
                          </span>
                        ) : (
                          "First Name"
                        )}
                      </Form.Label>

                      {/* {errors.fname && <span className="error text-danger">{errors.fname}</span>} */}
                    </Col>
                    <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="mname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter mother name"
                          className="FormStyeling transparent-input"
                          value={mname}
                          // onChange={handleChange}
                          onChange={(e) => setmname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.mname ? (
                          <span className="error text-danger">
                            {errors.mname}
                          </span>
                        ) : (
                          "Mother Name"
                        )}
                      </Form.Label>
                    </Col>
                    <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter father name"
                          className="FormStyeling transparent-input"
                          value={fathername}
                          // onChange={handleChange}
                          onChange={(e) => setfathername(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.fathername ? (
                          <span className="error text-danger">
                            {errors.fathername}
                          </span>
                        ) : (
                          "Father Name"
                        )}
                      </Form.Label>
                    </Col>
                    <Col lg={2} className="d-none d-md-block">
                      <Form.Group
                        className="lname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter last name"
                          className="FormStyeling transparent-input"
                          value={lname}
                          // onChange={handleChange}
                          onChange={(e) => setlname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Label className="w-100 text-center">
                        {errors.lname ? (
                          <span className="error text-danger">
                            {errors.lname}
                          </span>
                        ) : (
                          "Last Name"
                        )}
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-block d-md-none">
                    <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>First Name</b>
                    </Col>
                    <Col lg={8}>
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={fname}
                          // onChange={handleChange}
                          onChange={(e) => setfname(e.target.value)}
                        />
                      </Form.Group>
                      {errors.fname && (
                        <span className="error text-danger">
                          {errors.fname}
                        </span>
                      )}
                    </Col>
                    <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Mother Name
                      </b>
                    </Col>
                    <Col lg={8}>
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={mname}
                          onChange={(e) => setmname(e.target.value)}
                        />
                      </Form.Group>
                      {errors.mname && (
                        <span className="error text-danger">
                          {errors.mname}
                        </span>
                      )}
                    </Col>
                    <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Father Name
                      </b>
                    </Col>
                    <Col lg={8}>
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={fathername}
                          onChange={(e) => setfathername(e.target.value)}
                        />
                      </Form.Group>
                      {errors.fathername && (
                        <span className="error text-danger">
                          {errors.fathername}
                        </span>
                      )}
                    </Col>
                    <Col lg={4} className="pt-4">
                      <b style={{ fontFamily: "Century gothic" }}>last Name</b>
                    </Col>
                    <Col lg={8} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={lname}
                          onChange={(e) => setlname(e.target.value)}
                        />
                      </Form.Group>
                      {errors.lname && (
                        <span className="error text-danger">
                          {errors.lname}
                        </span>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    {/* email */}
                    <Col lg={4}>
                      <b style={{ fontFamily: "Century gothic" }}>Email Id</b>
                    </Col>
                    <Col lg={8} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </Form.Group>
                      {errors.email && (
                        <span className="error text-danger">
                          {errors.email}
                        </span>
                      )}
                    </Col>
                    <Col lg={4}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Permanent Address
                      </b>
                    </Col>
                    <Col lg={8} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={parmanenat_address}
                          onChange={(e) =>
                            setparmanenat_address(e.target.value)
                          }
                        />
                      </Form.Group>
                      {errors.parmanenat_address && (
                        <span className="error text-danger">
                          {errors.parmanenat_address}
                        </span>
                      )}
                    </Col>
                    <Col lg={4}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Current Address
                      </b>
                    </Col>
                    <Col lg={8} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"

                          className="FormStyeling transparent-input"
                          value={current_address}
                          onChange={(e) => setcurrent_address(e.target.value)}
                        />
                      </Form.Group>
                      {errors.current_address && (
                        <span className="error text-danger">
                          {errors.current_address}
                        </span>
                      )}
                    </Col>

                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Contact Details
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
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
                    <Col lg={2} md={2} sm={12} className="m-0 ">
                      <b style={{ fontFamily: "Century gothic" }}>
                        Whatsapp No:
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          placeholder="+91"
                          value={whatsappno}
                          onChange={handleWhatsappChange}
                        />
                      </Form.Group>
                      {errors.whatsappno && (
                        <span className="error text-danger">
                          {errors.whatsappno}
                        </span>
                      )}
                    </Col>

                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Date Of Birth
                      </b>
                    </Col>
                    <Col lg={3} md={3} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="date"
                          // placeholder="enter first name"
                          placeholder="+91"
                          className="FormStyeling transparent-input"
                          value={dob}
                          onChange={(e) => setdob(e.target.value)}
                        />
                      </Form.Group>
                      {errors.dob && (
                        <span className="error text-danger">{errors.dob}</span>
                      )}
                    </Col>
                    <Col lg={1} md={1} sm={12} className="m-0">
                      <b style={{ fontFamily: "Century gothic" }}>Age : </b>
                    </Col>
                    <Col lg={4} md={4} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling"
                          value={age}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>Gender</b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                        <Form.Check
                          type="radio"
                          label="Male"
                          name="gender"
                          value="Male"
                          onChange={(e) => setselected_gender(e.target.value)}
                          checked={gender === "Male"}
                        />
                        <Form.Check
                          type="radio"
                          label="Female"
                          name="gender"
                          value="Female"
                          onChange={(e) => setselected_gender(e.target.value)}
                          checked={gender === "Female"}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={4} sm={12}>
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

                    <Col lg={4} md={4} sm={12}>
                      <b style={{ fontFamily: "Century gothic" }}>
                        Aadhar Card no
                      </b>
                    </Col>
                    <Col lg={8} md={8} sm={12} className="mb-3">
                      <Form.Group
                        className="fname"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          // placeholder="enter first name"
                          className="FormStyeling transparent-input"
                          value={aadhar}
                          onChange={handleAadharChange}
                        />
                      </Form.Group>
                      {errors.aadhar && (
                        <span className="error text-danger">
                          {errors.aadhar}
                        </span>
                      )}
                    </Col>
                  </Row>
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
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Form>
      </div>
    </>
  );
}

export default UpdatePersonalDetails;
