import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEye, FaPrint, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const AddCourse = () => {
  const { searchQuery, handleSearch, filteredData } = useSearchExport();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);
  const BASE_URL = "https://api.sumagotraining.in/public/api";

  const fetchCourses = async () => {
    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await axios.get(`${BASE_URL}/get_course`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Fetched API Response:", response.data); // Debugging log
  
      // Extract actual course data array
      const coursesData = response.data?.data || [];  // Ensure it's always an array
  
      setCourses(coursesData);
    } catch (err) {
      console.error("Error fetching course details:", err);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleAddCourse = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setName("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("courseName", name);
    formData.append("courseFile", image);

    try {
      const response = await fetch(
        "https://api.sumagotraining.in/public/api/add_course",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Course added successfully!");
        navigate("/addcourse");
      } else {
        const responseData = await response.json();
        alert(`Submission failed: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };


  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: "Sr. No.",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name || "N/A", // Avoids undefined error
    },
    {
      name: "Course image",
      cell: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="Course"
            style={{ width: "50px", height: "50px", borderRadius:"50%", objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      name: "Status",
      selector: (row) => (row.is_active ? "Active" : "Inactive"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
            <Button className="ms-1" onClick={() => navigate(`/update-course/${row.id}`, { state: row })}>
              <FaEdit />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}>
            <Button className="ms-1" style={{ backgroundColor: "red", color: "white", borderColor: "red" }}>
              <FaTrash />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];
  
  
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col className="d-flex align-items-center">
                  <h5>Course Details</h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleAddCourse}>
                    <FaPlus /> Add Course
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <DataTable
                columns={tableColumns(currentPage, rowsPerPage)}
                data={filteredData.length > 0 ? filteredData : courses}
                pagination
                responsive
                striped
                noDataComponent="No Data Available"
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Adding Course */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddCourse;
