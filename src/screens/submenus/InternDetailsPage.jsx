import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaRegAddressBook, FaEye } from "react-icons/fa";
import instance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";

const InternDetailsPage = () => {
  const { id } = useParams();
  const [internDetails, setInternDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate();
  useEffect(() => {
    const fetchInternDetails = async () => {
      const accessToken = localStorage.getItem("remember_token");
      try {
        const response = await instance.get(`get-perticular-intern-personal-info/${id}`, {
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


  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this data?",
      customUI: ({ onClose }) => (
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2>Confirm to delete</h2>
          <p>Are you sure you want to delete this data?</p>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-primary"
              onClick={async () => {
                setLoading(true);
                const accessToken = localStorage.getItem("remember_token");
                try {
                  await instance.delete(`/intern-joining/delete/${id}`, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                  });
                  toast.success("Data Deleted Successfully");
                  fetchProducts();
                } catch (error) {
                  console.error("Error deleting data:", error);
                  toast.error("Error deleting data");
                } finally {
                  setLoading(false);
                }
                onClose();
              }}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      ),
    });
  };

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
    gender = "",
    blood = "",
    aadhar = "",
    linkdin = "",
    facebook = "",
    youtube = "",
    anyother_add = "",
    school_name = "",
    tenth_per = "",
    duretion = "",
    intern = "",
    twelve_diploma_per = "",
    graduation_details = "",
    graduation_per = "",
    post_graduation_details = "",
    post_graduation_per = "",
    anyother_cirt = "",
    selected_branches = "",
    other_branch = "",
    father_name = "",
    father_contactdetails = "",
    father_aadharno = "",
    fatherOccupation = "",
    mother_name = "",
    motherOccupation = "",
    mother_aadharno = "",
    mother_contactdetails = "",
    marriedStatus = "",
    husbandDetails = "",
    guardian_name = "",
    GuardianOccupation = "",
    Guardian_aadharno = "",
    Guardian_contactdetails = "",
    maritalStatus = "",
    technology_name = "",
    duration = "",
    selectedModules = "",
    selectedtraining_mode = "",
    intern_experience = "",
    experience_description = "",
    characteristics_describe = "",
    applicant_name = "",
    place = "",
    refrance = "",
    scoperefer = "",
    reference_name = "",
    reference_name1 = "",
    contact_number = "",
    contact_number1 = "",
    buttom_applicant_name = "",
    buttom_place = "",
  } = internDetails;

  return (
    <>
      <div className="container idcardbackimg">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"

        >
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} className="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text">
              INTERNS PROFILE
            </b>
          </div>
        </Container>

        {/* Intern Details */}
        <Container fluid>
          <Row>
            {/* Personal Details Section (left side) */}
            <Col md={6} className="text-start">
              <Card
                style={{
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
                className="mt-5"
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
                <Card.Header
                  className="cardpersonal_details"
                  style={{ backgroundColor: "transparent", border: "none" }}
                ></Card.Header>
                <Card.Body>
                  <h5
                    className="text-center mb-4"
                    style={{ fontWeight: "bold", color: "#333" }}
                  ></h5>

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Full Name:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {fname} {lname}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Email:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {email}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Contact:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {contact_details}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Whatsapp:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {whatsappno}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Blood Group:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {blood}
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col xs={5} className="text-muted">
                      Address:
                    </Col>
                    <Col xs={7} className="fw-bold">
                      {parmanenat_address}
                    </Col>
                  </Row>
                  <hr />
                </Card.Body>
              </Card>
            </Col>

            {/* Links Section (right side) */}
            <Col md={6} className="mt-5">
              <Card
                style={{
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
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
                    <b className="form-title">FORMS</b>
                  </div>
                </div>
                <Card.Body>
                  <ul className="list-unstyled" style={{ paddingTop: "40px" }}>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          1. Intern Joining
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>


                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>
                            }
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/intern-all-details/${id}`, { state: "row" })}

                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">Add Intern Details</Tooltip>
                            }
                          >
                            <Button
                              variant="success"
                              className="ms-1"
                              onClick={() => navigate(`/InterJoining/${id}`, { state: internDetails })}
                            // onClick={() => navigate(`/InterJoining/${id}`)}
                            >
                              <FaRegAddressBook style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/update-intern-details/${id}`)}
                            >
                              <FaEdit style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          {/* <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="delete-tooltip">Delete</Tooltip>
                            }
                          >
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => handleDelete(id)}
                            >
                              <FaTrash />
                            </Button>
                          </OverlayTrigger> */}
                        </div>
                      </div>
                    </li>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          2. Id Card Issue
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>
                            }
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/Id-card-all-details/${id}`, { state: "row" })}
                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">Issue Id Card</Tooltip>
                            }
                          >
                            <Button
                              variant="success"
                              className="ms-1"
                              onClick={() => navigate(`/IdCardIssue/${id}`)}
                            >
                              <FaRegAddressBook style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/update-Id-card-details/${id}`)}
                            >
                              <FaEdit style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          {/* <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="delete-tooltip">Delete</Tooltip>
                            }
                          >
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </OverlayTrigger> */}
                        </div>
                      </div>
                    </li>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          3. Completion
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>

                            }
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/completion-all-details/${id}`, { state: "row" })}
                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>



                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">Add Completion</Tooltip>
                            }
                          >
                            <Button
                              variant="success"
                              className="ms-1"
                              onClick={() => navigate(`/Completion/${id}`)}
                            >
                              <FaRegAddressBook style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              onClick={() => navigate(`/update-completion-details/${id}`)}

                            >
                              <FaEdit style={{ color: "black" }} />
                            </Button>
                          </OverlayTrigger>
                          {/* <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="delete-tooltip">Delete</Tooltip>
                            }
                          >
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </OverlayTrigger> */}
                        </div>
                      </div>
                    </li>
                    <hr />
                    <li style={{ marginBottom: "15px", fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          4. T3 Sheet Details
                        </a>
                        <div style={{ display: "flex", gap: "10px" }}>


                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="Add-tooltip">View</Tooltip>
                            }
                          >
                            <Button
                              variant="primary"
                              className="ms-1"
                              style={{ marginRight:"110px" }}
                              onClick={() => navigate(`/T3SheetAllDetails/${id}`, { state: "row" })}

                            >
                              <FaEye style={{ color: "white" }} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* <Container fluid>
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
                  <b className="form-title">SOCIAL MEDIA ADDRESS</b>
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
               
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Linkedin Address :
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
                      Facebook Address :
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
        </Container> */}

        {/* <Container fluid>
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
                  <b className="form-title">EDUCATIONAL DETAILS</b>
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
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      School Name :{" "}
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter school name"
                        className="FormStyeling transparent-input"
                        value={`${school_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      10<sup>th</sup> Percentage :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter 10th percentage"
                        className="FormStyeling transparent-input"
                        value={`${tenth_per}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      12<sup>th</sup>/Diploma Percentage :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter 12th/Diploma percentage"
                        className="FormStyeling transparent-input"
                        value={`${twelve_diploma_per}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Graduation Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter graduation details"
                        className="FormStyeling transparent-input"
                        value={`${graduation_details}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Graduation Percentage :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter graduation percentage"
                        className="FormStyeling transparent-input"
                        value={`${graduation_per}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Post Graduation Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter graduation details"
                        className="FormStyeling transparent-input"
                        value={`${post_graduation_details}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Post Graduation Percentage :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter graduation percentage"
                        className="FormStyeling transparent-input"
                        value={`${post_graduation_per}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Branch :</b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter graduation percentage"
                      className="FormStyeling transparent-input"
                      value={`${selected_branches}`}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Any Other Certification :
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${anyother_cirt}`}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container> */}

        {/* <Container fluid>
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
                  <b className="form-title">PARENTS / GUARDIAN DETAILS</b>
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
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Name :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter fathername"
                        className="FormStyeling transparent-input"
                        value={`${father_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Occupation:
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter father occupation"
                        className="FormStyeling transparent-input"
                        value={`${fatherOccupation}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Contact Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${father_contactdetails}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Father Aadhar Card No :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Father Aadhar card no"
                        className="FormStyeling transparent-input"
                        value={`${father_aadharno}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Name :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter fathername"
                        className="FormStyeling transparent-input"
                        value={`${mother_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Occupation :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter father occupation"
                        className="FormStyeling transparent-input"
                        value={motherOccupation}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Contact Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${mother_contactdetails}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Mother Aadhar card No. :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter mother Aadhar card no"
                        className="FormStyeling transparent-input"
                        value={`${mother_aadharno}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Married :</b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="FormStyeling transparent-input"
                        value={`${marriedStatus}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <bt />
                  
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Name :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Guardian Name"
                        className="FormStyeling transparent-input"
                        value={`${guardian_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Occupation :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Guardian Occupation"
                        className="FormStyeling transparent-input"
                        alue={`${GuardianOccupation}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Contact Details :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${Guardian_contactdetails}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12} className="m-0 ">
                    <b style={{ fontFamily: "Century gothic" }}>
                      Guardian Aadhar card No :
                    </b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Guardian Aadhar card no"
                        className="FormStyeling transparent-input"
                        value={`${Guardian_aadharno}`}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container> */}

        {/* <Container fluid>
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
                  <b className="form-title">INTERNSHIP DETAILS</b>
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
                  <Col lg={4}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Technology Name :
                    </b>
                  </Col>
                  <Col lg={8}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        // placeholder="enter first name"
                        className="FormStyeling transparent-input"
                        value={`${technology_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Duration :</b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="duretion"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="+91"
                        className="FormStyeling transparent-input"
                        value={`${duration}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>Module :</b>
                  </Col>
                  <Col lg={3} md={3} sm={12} className="mb-3">
                    <Form.Group
                      className="duretion"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${selectedModules}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <b
                      style={{ fontFamily: "Century gothic" }}
                      className="label-colour"
                    >
                      Training Mode:
                    </b>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-3">
                    <Form.Group controlId="trainingMode">
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={selectedtraining_mode || "Not Specified"}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <b style={{ fontFamily: "Century gothic" }} className="mb-3">
                    Do you have Previous Work , internship or Volunteer
                    Experience ?
                  </b>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="duretion"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="FormStyeling transparent-input"
                        value={`${intern_experience}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mb-5">
                    {intern_experience == "Yes" && (
                      <div>
                        <Form.Group
                          className="duretion"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="text"
                            className="FormStyeling transparent-input"
                            value={`${experience}dfsdfs`}
                          />
                        </Form.Group>
                      </div>
                    )}
                  </Col>

                  <b style={{ fontFamily: "Century gothic" }}>
                    Which characteristics best describe you?
                  </b>
                  <Form.Group
                    className="fname mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      className="FormStyeling transparent-input"
                      as="textarea"
                      rows={4}
                      value={characteristics_describe}
                    ></Form.Control>
                  </Form.Group>
                  <b style={{ fontFamily: "Century gothic" }} className="mb-3">
                    Note: You have an 8-day period to change your choosen
                    technology. If you wish to make a change, please do so
                    within 8-days of timeframe.
                  </b>

                  <Col lg={4} md={4} sm={12}>
                    <div class="box"></div>
                    <Form.Label className="w-100 text-center">
                      Applicant Signature
                    </Form.Label>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="fname1 mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className=" FormStyeling transparent-input"
                        as="textarea"
                        rows={4}
                        value={applicant_name}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="fname1 mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        as="textarea"
                        rows={4}
                        value={place}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container> */}

        {/* R E F E R E N C E */}
        {/* <Container fluid>
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
                  <b className="form-title">REFERENCE</b>
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
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      <Form.Check
                        type="checkbox"
                        label="Social Media"
                        name="refrance"
                        value={refrance}
                      />
                    </b>
                  </Col>
                  <Col lg={10} md={10} sm={12}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>

                  
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Would you like to give reference about Scope / Sumago ? :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${scoperefer}`}
                      />
                    </Form.Group>
                  </Col>

                  <bt />
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Reference name :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${reference1Name}`}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>
                  <Col lg={5} md={5} sm={12}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        value={`${reference2Name}`}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Contact number :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12}>
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        placeholder="+91"
                        value={reference1Contact}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>
                  <Col lg={5} md={5} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1 mb-3"
                    >
                      <Form.Control
                        type="text"
                        className="FormStyeling transparent-input"
                        placeholder="+91"
                        value={reference2Contact}
                      />
                    </Form.Group>
                    <Form.Label className="w-100 text-center"></Form.Label>
                  </Col>

                  <b
                    className="mb-5"
                    style={{
                      fontFamily: "Century Gothic",
                      textAlign: "justify",
                    }}
                  >
                    I certify that the information I have provided above is true
                    to the best of my knowledge and belief, without any malice
                    or intention to commit acts of misrepresentation. I am aware
                    that any false, misleading, or deceptive information
                    provided may lead to withdrawal, exclusion, or disciplinary
                    action, which may be dealt with by the company or relevant
                    authorities.
                  </b>

                  <Col lg={2} md={2} sm={12}>
                    <b style={{ fontFamily: "Century gothic" }}>
                      Name of Applicant :{" "}
                    </b>
                  </Col>
                  <Col lg={5} md={5} sm={12} className="mb-5">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter applicant name"
                        className="FormStyeling transparent-input"
                        value={`${buttom_applicant_name}`}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={1} md={1} sm={12} className="m-0">
                    <b
                      className="single-line"
                      style={{ fontFamily: "Century Gothic" }}
                    >
                      Place:
                    </b>
                  </Col>
                  <Col lg={4} md={4} sm={12} className="mb-3">
                    <Form.Group
                      className="fname"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter place"
                        className="FormStyeling transparent-input"
                        value={`${buttom_place}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={2} md={2} sm={12} className="m-0">
                    <b style={{ fontFamily: "Century Gothic" }}>
                      Date Signed by Applicant:
                    </b>
                  </Col>
                  <Col lg={4} md={4} sm={12} className="mb-3">
                    <div className="box"></div>
                  </Col>
        
                  <Col lg={2} md={2} sm={12} className="m-0">
                    <b style={{ fontFamily: "Century Gothic" }}>
                      Applicant Signature:
                    </b>
                  </Col>
                  <Col lg={4} md={4} sm={12} className="mb-3">
                    <div className="box"></div>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container> */}
      </div>
    </>
  );
};

export default InternDetailsPage;
