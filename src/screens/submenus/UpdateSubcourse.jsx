import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateSubcourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subcourseData = location.state || {};

    const [coursename, setCoursename] = useState(subcourseData.coursename || "");
    const [subcourses_name, setSubcourses_name] = useState(subcourseData.subcourses_name || "");
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(true);
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
  



    const fetchCourses = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const response = await axios.get(`${BASE_URL}/get_course`, {
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

    const handleClose = () => {
        setShowModal(false);
        navigate(-1);
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
                    navigate("/addsubcourse");
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
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Subcourse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdate}>
                    {/* Dropdown for Course Selection */}
                    <Form.Group className="mb-3">
                        <Form.Label>Select Course</Form.Label>
                        <Form.Select value={coursename} onChange={(e) => setCoursename(e.target.value)}>
                            <option value="">-- Select Course --</option>
                            {[...new Set(courses.map((course) => course.name))].map((uniqueCourse, index) => (
                                <option key={index} value={uniqueCourse}>
                                    {uniqueCourse}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Subcourse Name Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Subcourse Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subcourse name"
                            value={subcourses_name}
                            onChange={(e) => setSubcourses_name(e.target.value)}
                        />
                    </Form.Group>

                    {/* File Upload */}
                    <Form.Group className="mb-3">
                                             <Form.Label>Upload File</Form.Label>
                                             <Form.Control
                                               type="file"
                                               onChange={async (e) => {
                                                 const file = e.target.files[0];
                                                 if (file && file.type.startsWith("image/")) {
                                                   try {
                                                     const base64 = await convertToBase64(file);
                                                     setImage(base64);
                                                   } catch (err) {
                                                     console.error("Base64 Conversion Error:", err);
                                                   }
                                                 } else {
                                                   setErrors("Only image files are allowed.");
                                                 }
                                               }}
                                             />
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

export default UpdateSubcourse;
