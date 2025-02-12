import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateSubcourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subcourseData = location.state || {};

    const [subcourseName, setSubcourseName] = useState(subcourseData.subcourseName || "");
    const [courseName, setCourseName] = useState(subcourseData.courseName || "");
    const [subcourseFile, setSubcourseFile] = useState(null);
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
        setShowModal(false);
        navigate(-1); // Go back to the previous page
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("remember_token");
        const formData = new FormData();
        formData.append("subcourseName", subcourseName);
        formData.append("courseName", courseName);
        if (subcourseFile) formData.append("subcourseFile", subcourseFile);

        try {
            const response = await fetch(
                `https://api.sumagotraining.in/public/api/intern-joining-personal-info/update-subcourse/${subcourseData.id}`,
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
                        <Form.Label>Select Course </Form.Label>
                        <Form.Select
                            type="text"
                            placeholder="select course name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Subcourse Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subcourse name"
                            value={subcourseName}
                            onChange={(e) => setSubcourseName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload New File</Form.Label>
                        <Form.Control type="file" onChange={(e) => setSubcourseFile(e.target.files[0])} />
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
