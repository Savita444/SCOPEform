import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import instance from "../../api/AxiosInstance";

import "./completion.css";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";

const InternDetailsPage = () => {
  const { id } = useParams();
  const [internDetails, setInternDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternDetails = async () => {
      const accessToken = localStorage.getItem("remember_token");
      try {
        const response = await instance.get(`get-perticular-intern/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setInternDetails(response.data[0]); // Assuming the first object contains intern details
      } catch (err) {
        setError("Failed to fetch intern details. Please try again later.");
        console.error("Error fetching intern details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!internDetails) return <p>No intern details found.</p>;

  const {
    fname = "",
    mname = "",
    fathername = "",
    lname = "",
    email = "",
    parmanenat_address = "",
    current_address = "",
    contact_details = "",
    whatsappno = "",
    dob = "",
    age = "",
    blood = "",
    aadhar = "",
    linkdin = "",
    facebook ="",
    youtube = "",
    anyother_add = "",
    school_name= "",
    tenth_per= "",
    duretion ="",
    intern="",
    twelve_diploma_per= "",
    graduation_details= "",
    graduation_per= "",
    post_graduation_details= "",
    post_graduation_per= "",
    anyother_cirt= "",
    selected_branches= "",
    other_branch= "",
    father_name= "",
    father_contactdetails= "",
    father_aadharno= "",
    fatherOccupation= "",
    mother_name= "",
    motherOccupation= "",
    mother_aadharno= "",
    mother_contactdetails= "",
    marriedStatus= "",
    husbandDetails= "",
    guardian_name= "",
    GuardianOccupation= "",
    Guardian_aadharno= "",
    Guardian_contactdetails= "",
    maritalStatus ="",
    technology_name= "",
    duration= "",
    selectedModules= "",
    intern_experience= "",
    experince= "",
    characteristics_describe= "",
    applicant_name= "",
    place= "",
    refrance="",
    refereance_name= "",
    conatct_number= "",
    buttom_applicant_name= "",
    buttom_place= "",

    
  } = internDetails;

  return (
    <>
      <div className="container backimg">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div className="logo-container">
          <img src={logo2} className="img-fluid logo2" alt="..." />
        </div>
        {/* <Container>
          <div className="text-center title-container">
            <b className="title-text">
              INTERNS JOINING <span className="highlight">FORM</span>
            </b>
          </div>
        </Container>
        <Container className="position-relative text-center homepara">
          <p>
            SCOPE, where we believe in empowering individuals through education
            and skill development. Established with a vision to foster
            excellence and innovation in learning, Scope is dedicated to
            providing high-quality training programs tailored to meet the
            diverse needs of our students.
          </p>
        </Container>
        <Container className="position-relative text-center welcommsg">
          <p>
            <b>Welcome</b> To <b>Sumago Center of Practical Experience!!</b>
          </p>
        </Container>
        <Container className="position-relative text-center para2">
          <p style={{ textAlign: "justify" }}>
            We’re glad to have you on board as part of our intern team. Get
            ready to dive into hands-on learning, sharpen your skills, and make
            meaningful contributions. Let’s make this journey both rewarding and
            memorable!
          </p>
        </Container> */}

        {/* Intern Details */}
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
                  <b className="form-title">PERSONAL DETAILS</b>
                </div>
              </div>
            </Card.Header>
            <Card.Body
              style={{ backgroundColor: "transparent", color: "white" }}
              className="pt-5"
            >
              <Row>
                {/* First name */}
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="d-none d-md-block label-colour"
                  >
                    First Name : {" "}
                  </b>
                </Col>
                <Col lg={8} className="d-none d-md-block">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${fname} ${fathername} ${mname} ${lname}`}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/* email */}
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Email Id :
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
                      value={`${email}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Permanent Address :
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
                      value={`${parmanenat_address}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Current Address :
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
                      value={`${current_address}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Contact Details :
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
                      value={`${contact_details}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={2} sm={12} className="m-0 ">
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Whatsapp No :
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
                      value={`${whatsappno}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Date Of Birth :
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
                      value={`${dob}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={1} md={1} sm={12} className="m-0">
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Age : {" "}
                  </b>
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
                      value={`${age}`}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Blood Group :
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
                      value={`${blood}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Aadhar Card No :
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
                      value={`${aadhar}`}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
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
                  <b className="form-title">SOCIAL MEADI ADDRESS</b>
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
                  {/* email */}
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Linkdin Address :
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
                        value={`${linkdin}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      FaceBook Address :
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
                        value={`${facebook}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Youtube Address :
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
                        value={`${youtube}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Anyother Address :
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
                        value={`${anyother_add}`}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        <Container fluid>
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">EDUCATIONAL DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>

                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }}>School Name : </b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter school name" className='FormStyeling transparent-input' value={`${school_name}`}/>
                                            </Form.Group>

                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >10<sup>th</sup> Percentage :</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter 10th percentage" className='FormStyeling transparent-input' value={`${tenth_per}`} />
                                            </Form.Group>

                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >12<sup>th</sup>/Diploma Percentage :</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter 12th/Diploma percentage" className='FormStyeling transparent-input' value={`${twelve_diploma_per}`} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Graduation Details :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation details" className='FormStyeling transparent-input' value={`${graduation_details}`}/>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Graduation Percentage :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation percentage" className='FormStyeling transparent-input' value={`${graduation_per}`} />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Post Graduation Details :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation details" className='FormStyeling transparent-input' value={`${post_graduation_details}`} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Post Graduation Percentage :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter graduation percentage" className='FormStyeling transparent-input' value={`${post_graduation_per}`} />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Branch :</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                        <Form.Control type="text" placeholder="Enter graduation percentage" className='FormStyeling transparent-input' value={`${selected_branches}`} />
                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Any Other Cirtification :</b></Col>
                                        <Col lg={8} md={8} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" className='FormStyeling transparent-input' value={`${anyother_cirt}`}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                    <Container fluid>
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">PARENTS / GAUARDIANDETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Father Name :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter fathername" className='FormStyeling transparent-input' value={`${father_name}`} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Father Occupation:</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter father occupation" className='FormStyeling transparent-input' value={`${fatherOccupation}`} />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Father Contact Details :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={`${father_contactdetails}`}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Father Aadhar Card No :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Father Aadhar card no" className='FormStyeling transparent-input' value={`${father_aadharno}`} ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Mother Name :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter fathername" className='FormStyeling transparent-input' value={`${mother_name}`} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Mother Occupation :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter father occupation" className='FormStyeling transparent-input' value={motherOccupation} />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Mother Contact Details :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={`${mother_contactdetails}`} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Mother Aadhar card No. :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter mother Aadhar card no" className='FormStyeling transparent-input' value={`${mother_aadharno}`} ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Married :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="" className='FormStyeling transparent-input' value={`${maritalStatus}`} ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <bt />
                                        {/* {marriedStatus === 'Yes' && (
                                            <>
                                                <Row>
                                                    <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} className='p-0 m-0' >Husband Name</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="Enter fathername" className='FormStyeling transparent-input' value={husbandDetails.name}
                                                                onChange={(e) => handleHusbandDetailsChange('name', e.target.value)} />
                                                        </Form.Group>
                                                        {husbandErrors.name && (
                                                            <span className="text-danger">{husbandErrors.name}</span>
                                                        )}
                                                    </Col>
                                                    <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Husband Occupation</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="Enter father occupation" className='FormStyeling transparent-input' value={husbandDetails.occupation}
                                                                onChange={(e) =>
                                                                    handleHusbandDetailsChange('occupation', e.target.value)
                                                                } />
                                                        </Form.Group>
                                                        {husbandErrors.occupation && (
                                                            <span className="text-danger">{husbandErrors.occupation}</span>
                                                        )}
                                                    </Col>

                                                    <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Husband Contact Details</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={husbandDetails.contact}
                                                                onChange={(e) => handleHusbandDetailsChange('contact', e.target.value)} />
                                                        </Form.Group>
                                                        {husbandErrors.contact && (
                                                            <span className="text-danger">{husbandErrors.contact}</span>
                                                        )}
                                                    </Col>
                                                    <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Husband Aadhar No</b></Col>
                                                    <Col lg={3} md={3} sm={12} className='mb-3'>
                                                        <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                            <Form.Control type="text" placeholder="Enter Father Aadhar card no" className='FormStyeling transparent-input' value={husbandDetails.aadhar}
                                                                onChange={(e) => handleHusbandDetailsChange('aadhar', e.target.value)}></Form.Control>
                                                        </Form.Group>
                                                        {husbandErrors.aadhar && (
                                                            <span className="text-danger">{husbandErrors.aadhar}</span>
                                                        )}
                                                    </Col>
                                                </Row>


                                            </>
                                        )} */}
                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Guardian Name :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Guardian Name" className='FormStyeling transparent-input' value={`${guardian_name}`} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Guardian Occupation :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Guardian Occupation" className='FormStyeling transparent-input' alue={`${GuardianOccupation}`} ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col lg={4} md={4} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Guardian Contact Details :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={`${Guardian_contactdetails}`}/>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12} className='m-0 '><b style={{ fontFamily: 'Century gothic' }} >Guardian Aadhar card No :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter Guardian Aadhar card no" className='FormStyeling transparent-input' value={`${Guardian_aadharno}`} ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Container>
                    <Container fluid>
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">INTERNSHIP DETAILS</b>
                                    </div>
                                </div>
                            </Card.Header>

                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                        <Col lg={4}><b style={{ fontFamily: 'Century gothic' }} >Technology Name :</b></Col>
                                        <Col lg={8} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    // placeholder="enter first name"
                                                    className='FormStyeling transparent-input'
                                                    value={`${technology_name}`} 
                                                />

                                            </Form.Group>
                                           
                                        </Col>
                                        <Col lg={4} md={4} sm={12}><b style={{ fontFamily: 'Century gothic' }} >Duration :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                            <Form.Group className="duretion" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={`${duretion}`}/>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >Module :</b></Col>
                                        <Col lg={3} md={3} sm={12} className='mb-3'>
                                        <Form.Group className="duretion" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="+91" className='FormStyeling transparent-input' value={`${selectedModules}`}/>
                                            </Form.Group>
                                        </Col>
                                        <b style={{ fontFamily: 'Century gothic' }} className='mb-3'>Do you have Previous Work , internship or Volunteer Experience ?</b>
                                        <Col lg={4} md={4} sm={12}>
                                        <Form.Group className="duretion" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="" className='FormStyeling transparent-input' value={`${intern}`}/>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={8} md={8} sm={12} className='mb-5'>
                                            {intern_experience === 'Yes' && (
                                                <div>
                                                    <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                        <Form.Control type="text" placeholder="Enter experince" className='FormStyeling transparent-input' value={`${experince}`}
                                                            ></Form.Control>
                                                    </Form.Group>
                                                </div>
                                            )}

                                        </Col>

                                        <b style={{ fontFamily: 'Century gothic' }}  >Which characteristics best describe you?</b>
                                        <Form.Group className="fname mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="text" className='FormStyeling transparent-input' as="textarea" rows={4} value={characteristics_describe} ></Form.Control>
                                        </Form.Group>
                                        <b style={{ fontFamily: 'Century gothic' }} className='mb-3'>Note: You have an 8-day period to change your choosen technology. If you wish to make a change,
                                            please do so within 8-days of timeframe.</b>

                                        <Col lg={4} md={4} sm={12}>
                                            <div class="box">
                                            </div>
                                            <Form.Label className="w-100 text-center">
                                                Applicant Signature
                                            </Form.Label>

                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <Form.Group className="fname1 mb-2" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" className=' FormStyeling transparent-input' as="textarea" rows={4} value={applicant_name} ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <Form.Group className="fname1 mb-2" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" className='FormStyeling transparent-input' as="textarea" rows={4} value={place} ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Container>

                     {/* R E F E R E N C E */}
                     <Container fluid>
                        {/* <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header className="cardpersonal_details">
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: "black", width: "20px", height: "30px" }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b>REFERENCE</b>
                                    </div>
                                </div>
                            </Card.Header> */}
                        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Card.Header
                                className="cardpersonal_details"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div
                                    className="position-absolute"
                                    style={{ backgroundColor: 'black', width: '20px', height: '30px' }}
                                >
                                    <div className="personal-card-heading position-relative">
                                        <b className="form-title">REFERENCE</b>
                                    </div>
                                </div>
                            </Card.Header>

                            <Card.Body style={{ backgroundColor: 'transparent', color: 'white' }} className='pt-5'>
                                <Card.Title className='text-black'></Card.Title>
                                <Card.Text className='text-black'>
                                    <Row>
                                    <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="radio"
                                                label="Social Media"
                                                name="refrance"
                                                value={refrance}
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />

                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">

                                            </Form.Label>
                                        </Col>
                                        
                                        {/* <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="radio"
                                                label="Social Media"
                                                name="refrance"

                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />

                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">

                                            </Form.Label>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="radio"
                                                label="Friend"
                                                name="refrance"
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="radio"
                                                label="Family"
                                                name="refrance"
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>

                                        <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="radio"
                                                label="Relatives"
                                                name="refrance"
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col> */}

                                        {/* <Col lg={2} md={2} sm={12}><b style={{ fontFamily: 'Century gothic' }} >
                                            <Form.Check
                                                type="radio"
                                                label="Other"
                                                name="refrance"
                                            />
                                        </b></Col>
                                        <Col lg={10} md={10} sm={12} >
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col> */}

                                        <Col lg={5} md={5} sm={12}><b style={{ fontFamily: 'Century gothic' }}>Would you like to give reference about Scope / Sumago ? : </b></Col>
                                        <Col lg={1} md={1} sm={12} className='mb-5' >
                                            <Form.Check
                                                type="radio"
                                                label="Yes"
                                                name="refrance"
                                            />
                                        </Col>
                                        <Col lg={1} md={2} sm={12} >
                                            <Form.Check
                                                type="radio"
                                                label="no"
                                                name="refrance"
                                            />
                                        </Col>
                                        <bt />
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: 'Century gothic' }}>Reference name : </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={`${refereance_name}`}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    value={`${refereance_name}`}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>
                                        <Col lg={2} md={2} sm={12}>
                                            <b style={{ fontFamily: 'Century gothic' }}>Contact number : </b>
                                        </Col>
                                        <Col lg={5} md={5} sm={12}>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    placeholder='+91'
                                                    value={conatct_number}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>
                                        <Col lg={5} md={5} sm={12} className='mb-5'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1 mb-3">
                                                <Form.Control
                                                    type="text"
                                                    className='FormStyeling transparent-input'
                                                    placeholder='+91'
                                                    value={conatct_number}
                                                />
                                            </Form.Group>
                                            <Form.Label className="w-100 text-center">
                                            </Form.Label>
                                        </Col>

                                        <b className='mb-5'
                                            style={{
                                                fontFamily: 'Century Gothic',
                                                textAlign: 'justify',
                                            }}
                                        >
                                            I certify that the information I have provided above is true to the best of my
                                            knowledge and belief, without any malice or intention to commit acts of
                                            misrepresentation. I am aware that any false, misleading, or deceptive
                                            information provided may lead to withdrawal, exclusion, or disciplinary
                                            action, which may be dealt with by the company or relevant authorities.
                                        </b>

                                        <Col lg={2} md={2} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Name of Applicant : </b></Col>
                                        <Col lg={5} md={5} sm={12} className='mb-5'>
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" placeholder="Enter applicant name" className='FormStyeling transparent-input' value={`${buttom_applicant_name}`}/>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className="m-0">
                                            <b className="single-line" style={{ fontFamily: 'Century Gothic' }}>Place:</b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <Form.Group className="fname" controlId="exampleForm.ControlInput1">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter place"
                                                    className="FormStyeling transparent-input"
                                                    value={buttom_place}
                                                />
                                            </Form.Group>
                                          
                                        </Col>


                                        <Col lg={2} md={2} sm={12} ><b style={{ fontFamily: 'Century gothic' }} >Name of Applicant : </b></Col>
                                        <Col lg={4} md={4} sm={12} className='mb-3'>
                                            <Form.Group className="fname mb-2" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="date" className='FormStyeling transparent-input' as="textarea" rows={4} value={`${applicant_name}`}></Form.Control>
                                            </Form.Group>
                                            {/* <Form.Control
                                                    type="date"
                                                    placeholder="Enter date"
                                                    className=' transparent-input'  rows={4}
                                                    
                                                /> */}
                                        </Col>
                                        {/* <Col lg={2} md={2} sm={12} className="m-0">
                                            <b className="single-line1" style={{ fontFamily: 'Century Gothic' }}>
                                                Applicant Signature:
                                            </b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <div className="box"></div>
                                        </Col>
                                        <Col lg={1} md={1} sm={12} className="m-0">
                                            <b className="single-line" style={{ fontFamily: 'Century Gothic' }}>Place:</b>
                                        </Col> */}
                                        <Col lg={2} md={2} sm={12} className="m-0">
                                            <b style={{ fontFamily: 'Century Gothic' }}>Aplicant Signature:</b>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} className="mb-3">
                                            <div className="box"></div>
                                        </Col>







                                    </Row>
                                    {/* <div className="button-container">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }} // Change to your desired color
                                        >
                                            Submit
                                        </Button>

                                        <Button
                                            variant="primary"
                                            onClick={handlePrint}
                                            style={{ backgroundColor: "#17a2b8", borderColor: "#17a2b8" }} // Change to your desired color
                                        >
                                            Print
                                        </Button>
                                    </div> */}

                                    {/* <Button variant="primary" type='submit'>submit</Button>

                                    <Button variant="primary" onClick={handlePrint}>Print</Button> */}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Container>
      </div>
    </>
  );
};

export default InternDetailsPage;
