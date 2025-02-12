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

const AddSubsubcourse = () => {
  const { searchQuery, handleSearch, filteredData } = useSearchExport();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [subcourseName, setSubcourseName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customtext, setCustomtext] = useState("");
  const [courseFile, setCourseFile] = useState(null);
  const [subcourseFile, setSubcourseFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const accessToken = localStorage.getItem("remember_token");
    try {
      const response = await instance.get("get-intern-personal-info", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCourseName("");
    setCourseFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("subcourseName", subcourseName);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("customtext", customtext);
    formData.append("courseFile", courseFile);
    formData.append("subcourseFile", subcourseFile);

    try {
      const response = await fetch(
        "https://api.sumagotraining.in/public/api/intern-joining-personal-info/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Subcourse details added successfully!");
        navigate("/addsubsubcourse");
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
      cell: (row) => `${row.courseName} `,
    },
    {
      name: "Subcourse name",
      cell: (row) => `${row.subcourseName} `,
    },
    {
      name: "Title",
      cell: (row) => `${row.title} `,
    },
    {
      name: "Description",
      cell: (row) => `${row.description} `,
    },
    {
      name: "Custom Text",
      cell: (row) => `${row.customtext} `,
    },
    {
      name: "Status",
      cell: (row) => ``,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
            <Button className="ms-1" onClick={() => navigate(`/update-subcoursedetails/${row.id}`, { state: row })}>
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
                  <h5>Subcourse Details</h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <SearchInput searchQuery={searchQuery} onSearch={handleSearch} showExportButton={false} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleAddCourse}>
                    <FaPlus /> Subcourse Details
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
          <Modal.Title>Add Subcourse Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Subcourse</Form.Label>
              <Form.Select
                type="text"
                value={courseName}
                onChange={(e) => setSubcourseName(e.target.value)}
              />
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
                value={customtext}
                onChange={(e) => setCustomtext(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={(e) => setCourseFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={(e) => setSubcourseFile(e.target.files[0])} />
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

export default AddSubsubcourse;
