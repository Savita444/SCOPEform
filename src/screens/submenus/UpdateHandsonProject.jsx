import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";
import { Textarea } from "react-bootstrap-icons";


const UpdateHandsonProject = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const courseData = location.state || {};
    const [name, setName] = useState("");
    const [coursename, setCoursename] = useState("");
    const [subcourses_name, setSubcourses_name] = useState("");
    const [courses, setCourses] = useState([]);
    const [course_id, setCourseId] = useState("");


    const BASE_URL = "https://api.sumagotraining.in/public/api";

    useEffect(() => {
        fetchCourses(); // Fetch courses when component mounts
    }, []);



    const fetchCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_all_subcourses`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });



            setCourses(response.data?.data || []);
        } catch (error) {
            console.error("Error fetching courses:", error.response || error);
        }
    };



    // Function to handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!courseData.id) {
            toast.error("Invalid course ID.");
            return;
        }

        const token = localStorage.getItem("remember_token");
        const formData = new FormData();
        formData.append("name", name);

        try {
            const response = await fetch(
                `https://api.sumagotraining.in/public/api/update_course/${courseData.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
            console.log("Updating Course ID:", courseData.id);

            const textResponse = await response.text();
            console.log("Raw API Response:", textResponse); // Debugging

            if (response.ok) {
                toast.success("Course updated successfully!");
                navigate("/coursedetails");
            } else {
                toast.error(`Update failed: ${textResponse}`);
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("An error occurred. Please try again.");
        }
    };







    return (
        <div className="container backimg">
            <div>
                <img src={corner} className="corner_img" alt="Responsive Corner" />
            </div>
            <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={logo1} class="img-fluid logo1" alt="..." />
                <img src={logo2} className="img-fluid logo2" alt="..." />
            </div>




            <Container>
                <Row className="justify-content-center">
                    <Col md={10}> {/* Setting col-10 width */}
                        <Accordion defaultActiveKey="0">
                            <Card className="mt-5 mb-5">
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Container>
                                            <div className="text-start title-container">
                                                <b className="title-text fs-2">
                                                    UPDATE <span className="highlight">HANDSON PROJECT</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/handsonprojectdetails')}>
                                            Handson Project Details
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Subcourse Name</Form.Label>
                                                <Form.Select
                                                    value={subcourses_name}
                                                    onChange={(e) => {
                                                        setSubcourses_name(e.target.value);

                                                        const selectedCourse = courses.find(course => course.subcourses_name === e.target.value);
                                                        if (selectedCourse) {
                                                            setCoursename(selectedCourse.coursename);
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Subcourse --</option>
                                                    {courses.map((course) => (
                                                        <option key={course.subcourses_id} value={course.subcourses_name}>
                                                            {course.subcourses_name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Subcourse Name</Form.Label>
                                                <Form.Select
                                                    value={subcourses_name}
                                                    onChange={(e) => {
                                                        setSubcourses_name(e.target.value);

                                                        const selectedCourse = courses.find(course => course.subcourses_name === e.target.value);
                                                        if (selectedCourse) {
                                                            setCoursename(selectedCourse.coursename);
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Subcourse --</option>
                                                    {courses.map((course) => (
                                                        <option key={course.subcourses_id} value={course.subcourses_name}>
                                                            {course.subcourses_name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter title"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    as={"textarea"}
                                                    placeholder="Enter description"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </Form.Group>

                                            <div className="d-flex justify-content-center">
                                                <Button variant="primary" className="fs-5" type="submit">Submit</Button>
                                                {/* <Button variant="secondary" className="ms-2" onClick={() => navigate('/coursedetails')}>Cancel</Button> */}
                                            </div>

                                        </Form>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default UpdateHandsonProject;