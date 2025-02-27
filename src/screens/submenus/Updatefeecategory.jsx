import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Updatefeecategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseData = location.state || {};

  const [title, setTitle] = useState(courseData.title || "");
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    navigate(-1); // Go back to the previous page
  };

 

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!courseData.id) {
      toast.error("Invalid course ID.");
      return;
    }

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("title", title);

    try {
      const response = await fetch(
        `https://api.sumagotraining.in/public/api/update_feecategory/${courseData.id}`,
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
        toast.success("Program fee category updated successfully!");
        navigate("/addprogramfeescategory");
      } else {
        toast.error(`Update failed: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("An error occurred. Please try again.");
    }
  };



  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Program fees category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Program Fees Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

export default Updatefeecategory;
