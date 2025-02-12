import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseData = location.state || {};

  const [courseName, setCourseName] = useState(courseData.courseName || "");
  const [courseFile, setCourseFile] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    navigate(-1); // Go back to the previous page
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("courseName", courseName);
    if (courseFile) formData.append("courseFile", courseFile);

    try {
      const response = await fetch(
        `https://api.sumagotraining.in/public/api/intern-joining-personal-info/update/${courseData.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Course updated successfully!");
        navigate("/addcourse");
      } else {
        const responseData = await response.json();
        toast.error(`Update failed: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload New File</Form.Label>
            <Form.Control type="file" onChange={(e) => setCourseFile(e.target.files[0])} />
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

export default UpdateCourse;
