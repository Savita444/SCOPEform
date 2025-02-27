import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";


const UpdateSubcoursedetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const subcourseData = location.state || {};
    const [courses, setCourses] = useState([]);

    const [courses_name, setCourses_name] = useState(subcourseData.courses_name || "");
    const [subcourses_name, setSubcourses_name] = useState(subcourseData.subcourses_name || "");
    const [title, setTitle] = useState(subcourseData.title || "");
    const [description, setDescription] = useState(subcourseData.description || "");
    const [custome_text, setcustome_text] = useState(subcourseData.custome_text || "");
    
    const [banner, setBanner] = useState(null);
    const [back_image, setBack_image] = useState(null);
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
        setShowModal(false);
        navigate(-1); // Go back to the previous page
    };


    const BASE_URL = "https://api.sumagotraining.in/public/api";

    useEffect(() => {
        fetchCourses(); // Fetch courses when component mounts
    }, []);

    const fetchCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_subcourse_details_list`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const coursesData = response.data?.data || [];
            setCourses(coursesData); // Store fetched courses
        } catch (err) {
            console.error("Error fetching course details:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("remember_token");
        const formData = new FormData();
        formData.append("courses_name", courses_name);
        formData.append("subcourses_name", subcourses_name);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("customtext", custome_text);
        formData.append("banner", banner);
        formData.append("back_image", back_image);

        if (banner) formData.append("banner", banner);
        if (back_image) formData.append("back_image", back_image);


        try {
            const response = await fetch(
                `https://api.sumagotraining.in/public/api/update_subcourse_details/${subcourseData.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                toast.success("Subcourse updated successfully!");
                navigate("/addsubcourse");
            } else {
                const responseData = await response.json();
                toast.error(`Update failed: ${responseData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error updating subcourse:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Subcourse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Course</Form.Label>
                        <Form.Select
                            value={courses_name}
                            onChange={(e) => setCourses_name(e.target.value)}
                        >
                            <option value="">-- Select Course --</option>
                            {[...new Set(courses.map((course) => course.courses_name))].map((uniqueCourse, index) => (
                                <option key={index} value={uniqueCourse}>
                                    {uniqueCourse}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select Subcourse</Form.Label>
                        <Form.Select
                            value={subcourses_name}
                            onChange={(e) => setSubcourses_name(e.target.value)}
                        >
                            <option value="">-- Select Subcourse --</option>
                            {[...new Set(courses.map((course) => course.subcourses_name))].map((uniqueCourse, index) => (
                                <option key={index} value={uniqueCourse}>
                                    {uniqueCourse}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Custom Text</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter custom text"
                            value={custome_text}
                            onChange={(e) => setcustome_text(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload File</Form.Label>
                        <Form.Control type="file" onChange={(e) => setBanner(e.target.files[0])} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload File</Form.Label>
                        <Form.Control type="file" onChange={(e) => setBack_image(e.target.files[0])} />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateSubcoursedetails;
