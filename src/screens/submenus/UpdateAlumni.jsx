import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateAlumni = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subcourseData = location.state || {};
    const [course_id, setCourseId] = useState("");
    const [coursename, setCoursename] = useState(subcourseData.coursename || "");
    const [subcourses_name, setSubcourses_name] = useState(subcourseData.subcourses_name || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(subcourseData.image || null);
    const [courses, setCourses] = useState([]); // Store courses

    const BASE_URL = "https://api.sumagotraining.in/public/api";

    useEffect(() => {
        fetchCourses(); // Fetch courses when component mounts
    }, []);


    // Function to convert image to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const base64 = await convertToBase64(file);
            setImage(base64);
            setPreview(URL.createObjectURL(file));
        } else {
            toast.error("Only image files are allowed.");
        }
    };

    useEffect(() => {
        const courseIdFromLocation = location.state?.course_id;
        if (courseIdFromLocation) {
            setCourseId(courseIdFromLocation);
        }
        fetchCourses();
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


    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("remember_token");
        const formData = new FormData();
        formData.append("subcourses_name", subcourses_name);
        formData.append("name", coursename);
        if (image) formData.append("image", image);

        try {
            const response = await fetch(
                `${BASE_URL}/update_subcourse/${subcourseData.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const textResponse = await response.text(); // Read response as text first

            console.log("Raw API Response:", textResponse);

            try {
                const jsonResponse = JSON.parse(textResponse); // Try converting to JSON
                if (response.ok) {
                    toast.success("Subcourse updated successfully!");
                    navigate("/subcoursedetails");
                } else {
                    toast.error(`Update failed: ${jsonResponse.message || "Unknown error"}`);
                }
            } catch (jsonError) {
                console.error("Error parsing JSON:", jsonError);
                toast.error("Server returned an invalid response. Check console for details.");
            }
        } catch (error) {
            console.error("Error updating subcourse:", error);
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
                    <Col md={10}>
                        <Accordion defaultActiveKey="0">
                            <Card className="mb-4" >
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Container>
                                            <div className="text-start title-container">
                                                <b className="title-text fs-2">
                                                    UPDATE <span className="highlight">ALUMNI</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/alumnidetails')}>
                                            Alumni Details
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>
                                            {/* Dropdown for Course Selection */}
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
                                                <Form.Label>Alumni Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter alumni name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Control type="text" placeholder="Enter designation" value={name} onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter company name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Profile Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onDrop={handleDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {preview ? (
                                                        <Image src={preview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
                                                    ) : (
                                                        <p>Drag & Drop image here or click to upload</p>
                                                    )}
                                                </div>
                                                <Form.Control
                                                    type="file"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (file && file.type.startsWith("image/")) {
                                                            const base64 = await convertToBase64(file);
                                                            setImage(base64);
                                                            setPreview(URL.createObjectURL(file));
                                                        } else {
                                                            toast.error("Only image files are allowed.");
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Company Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onDrop={handleDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {preview ? (
                                                        <Image src={preview} alt="Preview" thumbnail style={{ maxWidth: "200px" }} />
                                                    ) : (
                                                        <p>Drag & Drop image here or click to upload</p>
                                                    )}
                                                </div>
                                                <Form.Control
                                                    type="file"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (file && file.type.startsWith("image/")) {
                                                            const base64 = await convertToBase64(file);
                                                            setImage(base64);
                                                            setPreview(URL.createObjectURL(file));
                                                        } else {
                                                            toast.error("Only image files are allowed.");
                                                        }
                                                    }}
                                                />
                                            </Form.Group>
                                            <div className="d-flex justify-content-center"> <Button variant="primary" className="fs-5" type="submit">Submit</Button>
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
export default UpdateAlumni;