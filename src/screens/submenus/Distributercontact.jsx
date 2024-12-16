
import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Table,
    Tooltip, OverlayTrigger,
    Alert,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";

import NewResuableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ThreeDots } from 'react-loader-spinner';

import "../../App.scss";
import { Label } from "recharts";
const Distributercontact = () => {

    const { searchQuery, handleSearch, handleExport, setData, filteredData } =
        useSearchExport();
    const [team, setTeam] = useState([]);
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [eyeVisibilityById, setEyeVisibilityById] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [showTable, setShowTable] = useState(true); // New state for toggling form and table view
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    console.log(editMode, 'team');
    console.log(editingId, 'editingId');

    const CustomHeader = ({ name }) => (
        <div style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>
            {name}
        </div>
    );



    const tableColumns = (currentPage, rowsPerPage) => [
        {
            name: <CustomHeader name="Sr. No." />,
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
        },
        {
            name: <CustomHeader name="State Name" />,
            cell: (row) => <span>{row.statename}</span>,
        },
        {
            name: <CustomHeader name="Company Name" />,
            cell: (row) => <span>{row.company_name}</span>,
        },
        {
            name: <CustomHeader name="Phone" />,
            cell: (row) => <span>{row.phone}</span>,
        },
        {
            name: <CustomHeader name="Location" />,
            cell: (row) => <span>{row.location}</span>,
        },
        {
            name: <CustomHeader name="Address" />,
            cell: (row) => <span>{row.address}</span>,
        },
        {
            name: <CustomHeader name="Actions" />,
            cell: (row) => (
                <div className="d-flex">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                    >
                        <Button className="ms-1" onClick={() => toggleEdit(row.id)}>
                            <FaEdit />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}
                    >
                        <Button
                            className="ms-1"
                            style={{ backgroundColor: "red", color: "white", borderColor: "red" }}
                            onClick={() => handleDelete(row.id)}
                        >
                            <FaTrash />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="visibility-tooltip">{eyeVisibilityById[row.id] ? 'Hide' : 'Show'}</Tooltip>}
                    >
                        <Button
                            className="ms-1"
                            style={{
                                backgroundColor: eyeVisibilityById[row.id] ? 'red' : 'green',
                                borderColor: eyeVisibilityById[row.id] ? 'red' : 'green',
                                color: 'white',
                            }}
                            onClick={() => handleIsActive(row.id, !eyeVisibilityById[row.id])}
                        >
                            {eyeVisibilityById[row.id] ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </OverlayTrigger>
                </div>
            ),
        },


    ];

    useEffect(() => {
        fetchTeam();
        // Retrieve and set visibility state from localStorage
        const storedVisibility = JSON.parse(localStorage.getItem('eyeVisibilityById')) || {};
        setEyeVisibilityById(storedVisibility);
    }, []);

    useEffect(() => {
        // Store visibility state in localStorage whenever it changes
        localStorage.setItem('eyeVisibilityById', JSON.stringify(eyeVisibilityById));
    }, [eyeVisibilityById]);


    useEffect(() => {
        if (formData.img) {
            if (formData.img instanceof File) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(formData.img);
            } else if (typeof formData.img === "string") {
                setImagePreview(formData.img);
            }
        } else {
            setImagePreview("");
        }
    }, [formData.img]);


    const fetchTeam = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
        try {
            const response = await instance.get("stateinfo/find", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json",
                },
            });
            const reversedData = response.data.responseData.reverse();
            setTeam(reversedData);
            setData(reversedData);
        } catch (error) {
            console.error(
                "Error fetching team:",
                error.response || error.message || error
            );
        } finally {
            setLoading(false);
        }
    };

    const validateForm = (formData) => {
        console.log("formData", formData);

        let errors = {};
        let isValid = true;

        if (!formData.statename) {
            errors.statename = "State Name is required";
            isValid = false;
        }
        if (!formData.company_name) {
            errors.company_name = "Company Name is required";
            isValid = false;
        }
        if (!formData.phone) {
            errors.phone = "Phone is required";
            isValid = false;
        }
        if (!formData.location) {
            errors.location = "Location is required";
            isValid = false;
        }
        if (!formData.address) {
            errors.address = "Address is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleChange = async (name, value) => {
        if (name === "img" && value instanceof File) {
            try {
                const fileType = value.type?.split("/")[0];

                if (fileType === "image" || fileType === "video") {
                    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

                    // Update preview if the file is an image or video
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImagePreview(reader.result);
                    };
                    reader.readAsDataURL(value);
                }
            } catch (error) {
                setErrors((prevErrors) => ({ ...prevErrors, img: "Error processing file" }));
                setImagePreview("");
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm(formData)) {
            setLoading(true);
            const accessToken = localStorage.getItem("accessToken");
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }
            console.log("data", data);

            try {
                if (editMode) {
                
                    await instance.put(`stateinfo/update/${editingId}`, formData);
                    toast.success("Data Updated Successfully");
                    const updatedTeam = team.map((member) =>

                        member.id === editingId ? formData : member
                    );
                    setTeam(updatedTeam);
                } else {
                   
                    await instance.post("stateinfo/add", formData);
                    toast.success("Data Submitted Successfully");
                }
                fetchTeam();

                setEditMode(false);
                setFormData({});
                setImagePreview("");
                setShowTable(true);
            } catch (error) {
                console.error("Error handling form submission:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDelete = async (id) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to delete this data?",
            customUI: ({ onClose }) => (
                <div
                    style={{
                        textAlign: "left",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
                        maxWidth: "400px",
                        margin: "0 auto",
                    }}
                >
                    <h2>Confirm to delete</h2>
                    <p>Are you sure you want to delete this data?</p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "20px",
                        }}
                    >
                        <button
                            style={{ marginRight: "10px" }}
                            className="btn btn-primary"
                            onClick={async () => {
                                setLoading(true);
                                const accessToken = localStorage.getItem("accessToken");
                                try {
                                    await instance.delete(`stateinfo/isdelete/${id}`, {
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    toast.success("Data Deleted Successfully");
                                    fetchTeam();
                                } catch (error) {
                                    console.error("Error deleting data:", error);
                                    toast.error("Error deleting data");
                                } finally {
                                    setLoading(false);
                                }
                                onClose();
                            }}
                        >
                            Yes
                        </button>
                        <button className="btn btn-secondary" onClick={() => onClose()}>
                            No
                        </button>
                    </div>
                </div>
            ),
        });
    };

    const handleIsActive = async (id, isVisible) => {
        confirmAlert({
            title: "Confirm to change visibility",
            customUI: ({ onClose }) => (
                <div
                    style={{
                        textAlign: "left",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
                        maxWidth: "400px",
                        margin: "0 auto",
                    }}
                >
                    <h2>Confirm to change visibility</h2>
                    <p>
                        Are you sure you want to {isVisible ? "hide" : "show"} this data?
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "20px",
                        }}
                    >
                        <button
                            style={{ marginRight: "10px" }}
                            className="btn btn-primary"
                            onClick={async () => {
                                setLoading(true);
                                const accessToken = localStorage.getItem("accessToken");
                                try {
                                    await instance.put(
                                        `stateinfo/isActive/${id}`,
                                        { isVisible },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${accessToken}`,
                                                "Content-Type": "application/json",
                                            },
                                        }
                                    );
                                    toast.success(
                                        `Data ${isVisible ? "hidden" : "shown"} successfully`
                                    );
                                    setEyeVisibilityById((prev) => ({
                                        ...prev,
                                        [id]: isVisible,
                                    }));
                                    fetchTeam();
                                } catch (error) {
                                    console.error("Error updating visibility:", error);
                                    toast.error("Error updating visibility");
                                } finally {
                                    setLoading(false); // Set loading to false
                                }
                                onClose();
                            }}
                        >
                            Yes
                        </button>
                        <button className="btn btn-secondary" onClick={() => onClose()}>
                            No
                        </button>
                    </div>
                </div>
            ),
        });
    };

    const toggleEdit = (id) => {
        const selectedMember = team.find((member) => member.id === id);
        setEditingId(id);
        console.log("selectedMember", selectedMember);

        setFormData({
            ...selectedMember,
        });
        setEditMode(true);
        setShowTable(false);
    };

    const handleAdd = () => {
        setFormData({});
        setEditMode(false);
        setShowTable(false); // Switch to form view when adding new item
    };

    const handleView = () => {
        setFormData({});
        setEditMode(false);
        setShowTable(true); // Switch to table view
    };

    return (


        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                {showTable ? (
                                    <Col className="d-flex justify-content-end align-items-center">

                                        <Button
                                            variant="outline-success"
                                            onClick={handleAdd}
                                            className="ms-2 mb-3"
                                        >
                                            Add
                                        </Button>
                                    </Col>
                                ) : (
                                    <Col className="d-flex justify-content-end align-items-center">
                                        <Button variant="outline-secondary" onClick={handleView}>
                                            View
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            {loading ? ( // Check loading state
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                                    <ThreeDots
                                        height="80"
                                        width="80"
                                        radius="9"
                                        color="#000"
                                        ariaLabel="three-dots-loading"

                                        visible={true}
                                    />
                                </div>
                            ) : showTable ? (
                                <DataTable
                                    columns={tableColumns(currentPage, rowsPerPage)}
                                    data={filteredData.length > 0 ? filteredData : team}
                                    pagination
                                    responsive
                                    striped
                                    noDataComponent="No Data Available"
                                    onChangePage={(page) => setCurrentPage(page)}
                                    onChangeRowsPerPage={(rowsPerPage) =>
                                        setRowsPerPage(rowsPerPage)
                                    }
                                />
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <NewResuableForm
                                                label={"State Name"}
                                                placeholder={"Enter State Name"}
                                                type={"text"}
                                                name={"statename"}
                                                onChange={handleChange}
                                                initialData={formData}
                                                error={errors.statename}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <NewResuableForm
                                                label={"Company Name"}
                                                placeholder={"Enter Company Name"}
                                                type={"text"}
                                                name={"company_name"}
                                                onChange={handleChange}
                                                initialData={formData}
                                                error={errors.company_name}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <NewResuableForm
                                                label={"Phone"}
                                                placeholder={"Enter Phone"}
                                                type={"text"}
                                                name={"phone"}
                                                onChange={handleChange}
                                                initialData={formData}
                                                error={errors.phone}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <NewResuableForm
                                                label={"Location"}
                                                placeholder={"Enter Location"}
                                                type={"text"}
                                                name={"location"}
                                                onChange={handleChange}
                                                initialData={formData}
                                                error={errors.location}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <NewResuableForm
                                                label={"Address"}
                                                placeholder={"Enter Address"}
                                                type={"text"}
                                                name={"address"}
                                                onChange={handleChange}
                                                initialData={formData}
                                                error={errors.address}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="mt-3 d-flex justify-content-end">
                                            <Button type="submit" variant={editMode ? "success" : "primary"}>
                                                {editMode ? "Update" : "Submit"}
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Distributercontact;
