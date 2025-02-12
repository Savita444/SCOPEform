import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import instance from "../../api/AxiosInstance";
import pdficon from "../imgs/download.png";

import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";

const CompletionAllDetails = () => {
  const { id } = useParams();
  const [internDetails, setInternDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternDetails = async () => {
      const accessToken = localStorage.getItem("remember_token");
      try {

        const response = await instance.get(`get-perticular-completion-intern-studId/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        setInternDetails(response.data); // Assuming the first object contains intern details
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
    fathername = "",
    mname = "",
    lname = "",
    email = "",
    technology_name: technology = "",
    date_of_joining = "",
    current_working = "",
    selected_mode: selectedMode = "",
    project_title = "",
    describe_project = "",
    placed = "",
    employer_name = "",
    package_in_lpa = "",
    designation_in_current_company = "",
    task_links_1 = "",
    task_links_2 = "",
    task_links_3 = "",
    task_links_4 = "",
    task_links_5 = "",
    project_github = "",
    final_year_project_link = "",
    name_contact_of_first_candidate = "",
    name_contact_of_second_candidate = "",
    name_contact_of_third_candidate = "",
    name_contact_of_fourth_candidate = "",
    name_contact_of_fifth_candidate = "",
    blog_on_your_selected_technology = "",
    google_review_img = "",
    resume_pdf = "",
    feedback_video = "",
  } = internDetails;

  // URLs for assets (if present)
  const googleReviewImgUrl = google_review_img ? `${google_review_img}` : null;
  const resumePdfUrl = resume_pdf ? `${resume_pdf}` : null;
  const feedbackVideoUrl = feedback_video
    ? feedback_video.replace("video\\/mp4", "video/mp4")
    : null;





  return (
    <>
      <div className="container backimg">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={logo1} class="img-fluid logo1" alt="..." />
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
                  <b className="form-title">INTERNSHIP COMPLETION FORM</b>
                </div>
              </div>
            </Card.Header>
            <Card.Body
              style={{ backgroundColor: "transparent", color: "white" }}
              className="pt-5"
            >
              <Row>
                {/* First name */}
                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="d-none d-md-block label-colour"
                  >
                    Name :{" "}
                  </b>
                </Col>
                <Col g={10} md={10} sm={12} className="d-none d-md-block">
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
                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Technology:
                  </b>
                </Col>
                <Col lg={4} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${technology}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Email ID:
                  </b>
                </Col>
                <Col lg={4} md={5} sm={12} className="mb-3">
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
                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Date of Joining :
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

                      className="FormStyeling transparent-input"
                      value={`${date_of_joining}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Training Mode :
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
                      placeholder="+91"
                      className="FormStyeling transparent-input"
                      value={`${selectedMode}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={2} sm={12} className="m-0 ">
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Currently Working On :
                  </b>
                </Col>
                <Col lg={10} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      placeholder="+91"
                      value={`${current_working}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={2} md={4} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Project Title :
                  </b>
                </Col>
                <Col lg={10} md={3} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      placeholder="+91"
                      className="FormStyeling transparent-input"
                      value={`${project_title}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={3} sm={12} className="m-0">
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Describe the Project in 3 to 4 Lines:{" "}
                  </b>
                </Col>
                <Col lg={9} md={9} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling"
                      value={`${describe_project}`}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col lg={3} md={3} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Placed Anywhere ? :
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
                      value={`${placed}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Employer Name (If No, Enter NA):
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
                      className="FormStyeling transparent-input"
                      value={`${employer_name}`}
                    />
                  </Form.Group>
                </Col>

                <Col lg={3} md={3} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Designation in Current Company (If No, Enter NA) :
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
                      value={`${designation_in_current_company}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Package in LPA (If No, Enter NA):
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
                      value={`${package_in_lpa}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} sm={12} className="mb-3 label-colour">
                  <b style={{ fontFamily: "Century gothic" }}>
                    Provide minimum 5 task links which you uploaded on linkedin
                  </b>{" "}
                </Col>

                <Col lg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Link 1 :
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${task_links_1}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Link 2 :
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${task_links_2}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Link 3 :
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${task_links_3}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Link 4 :
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${task_links_4}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Link 5 :
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${task_links_5}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    GitHub Link of Your Final Year Project :
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
                      className="FormStyeling transparent-input"
                      value={`${project_github}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Link of Final Project Completion Video on LinkedIn :
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
                      className="FormStyeling transparent-input"
                      value={`${final_year_project_link}`}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} sm={12} className="mb-3 label-colour">
                  <b style={{ fontFamily: "Century gothic" }}>
                    List of minimum 5 candidates which are refer from your side
                    for company{" "}
                  </b>{" "}
                </Col>

                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Name & Contact of First Candidate:
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${name_contact_of_first_candidate}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Name & Contact of Second Candidate:
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${name_contact_of_second_candidate}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Name & Contact of Third Candidate:
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${name_contact_of_third_candidate}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Name & Contact of Fourth Candidate:
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${name_contact_of_fourth_candidate}`}
                    />
                  </Form.Group>
                </Col>
                <Col llg={2} md={2} sm={12}>
                  <b
                    style={{ fontFamily: "Century gothic" }}
                    className="label-colour"
                  >
                    Name & Contact of Fifth Candidate:
                  </b>
                </Col>
                <Col lg={10} md={10} sm={12} className="mb-3">
                  <Form.Group
                    className="fname"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      // placeholder="enter first name"
                      className="FormStyeling transparent-input"
                      value={`${name_contact_of_fifth_candidate}`}
                    />
                  </Form.Group>
                </Col>

                   <Col lg={2} md={3} sm={12}>
                                  <b
                                    style={{ fontFamily: "Century gothic" }}
                                    className="label-colour"
                                  >
                                    Upload the screenshots of Google review
                                  </b>
                                </Col>
                                <Col lg={4} md={3} sm={12} className="mb-5">
                                  {googleReviewImgUrl && (
                                    <Form.Group className="fname" controlId="googleReview">
                                      <img
                                        src={googleReviewImgUrl}
                                        alt="Google Review"
                                        style={{ maxWidth: "200px" }}
                                      />
                                    </Form.Group>
                                  )}
                                </Col>
                                <Col lg={2} md={3} sm={12}>
                                  <b
                                    style={{ fontFamily: "Century gothic" }}
                                    className="label-colour"
                                  >
                                    Write minimum one Blog on your selected technology{" "}
                                  </b>{" "}
                                </Col>
                                <Col lg={4} md={3} sm={12} className="mb-5">
                                  <Form.Group
                                    className="fname"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Control
                                      type="text"
                                      name="blog_on_your_selected_technology"
                                      value={blog_on_your_selected_technology}
                                      className="FormStyeling transparent-input"
                                    />
                                  </Form.Group>
                                </Col>
                
                                <Col lg={2} md={3} sm={12}>
                                  <b
                                    style={{ fontFamily: "Century gothic" }}
                                    className="label-colour"
                                  >
                                    Upload your training video feedback
                                  </b>
                                </Col>
                                <Col lg={4} md={3} sm={12} className="mb-5">
                                  {feedbackVideoUrl && (
                                    <Form.Group className="fname" controlId="googleReview">
                                      <video
                                        src={feedbackVideoUrl}
                                        controls
                                        autoPlay
                                        playsInline
                                        style={{ maxWidth: "200px", cursor: "pointer" }}
                                        onError={() => console.error("Error loading video")}
                                      />
                                    </Form.Group>
                                  )}
                                </Col>
                
                                <Col lg={2} md={2} sm={12}>
                                  <b
                                    style={{ fontFamily: "Century gothic" }}
                                    className="label-colour"
                                  >
                                    Upload your updated Resume
                                  </b>
                                </Col>
                
                                <Col lg={4} md={4} sm={12} className="mb-5">
                                  <Form.Group className="fname" controlId="videoFeedback">
                                    {resumePdfUrl && (
                                      <a
                                        href={resumePdfUrl}
                                        download // This will trigger the download action
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "inline-block" }}
                                      >
                                        {/* Static Image of the PDF (Thumbnail) */}
                                        <img
                                          src={pdficon}
                                          class="img-fluid logo1"
                                          alt="PDF Thumbnail"
                                          style={{ maxWidth: "70px", cursor: "pointer" }}
                                        />
                
                                        <p>Click to Download Resume</p>
                                      </a>
                                    )}
                                  </Form.Group>
                                </Col>
                
                {/* <Col lg={2} md={2} sm={12}>
        <b style={{ fontFamily: "Century gothic" }} className="label-colour">
        Upload your updated Resume
        </b>
      </Col>
      <Col lg={4} md={4} sm={12} className="mb-5">
        <Form.Group className="fname" controlId="videoFeedback">
        {resumePdfUrl && (
      
          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
       
      )}
        </Form.Group>
      </Col> */}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default CompletionAllDetails;



