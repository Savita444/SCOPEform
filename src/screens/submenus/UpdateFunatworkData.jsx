import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Card, Image, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";


const UpdateFunatworkData = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const funatworkdetailsData = location.state || {};

    const [funatworkCategory_id, setFunatworkCategory_id] = useState("");
    const [funatworkdata_id, setFunatworkdata_id] = useState("");

    const [title, setTitle] = useState(funatworkdetailsData.title || "");
    const [description, setDescription] = useState(funatworkdetailsData.description || "");
    const [category_name, setCategory_name] = useState(funatworkdetailsData.category_name || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(funatworkdetailsData.image || null);
    const [funatworkcategory, setFunatworkCategory] = useState([]);





    useEffect(() => {
        fetchfunatworkcategoryData();
    }, []);

    useEffect(() => {
        // Once category list and data are both available, match by category_name
        if (funatworkcategory.length > 0 && category_name) {
            const matchedCategory = funatworkcategory.find(
                (cat) => cat.title === category_name
            );
            if (matchedCategory) {
                setFunatworkCategory_id(matchedCategory.id);
            }
        }
    }, [funatworkcategory, category_name]);




    // Function to convert image to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = (file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Only image files are allowed.");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleImageUpload(e.dataTransfer.files[0]);
    };




    const fetchfunatworkcategoryData = async () => {
        const accessToken = localStorage.getItem("remember_token");
        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";

            const response = await axios.get(`${BASE_URL}/get_funatworkcategory`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Ensure response.data.data is an array
            const funatworkData = Array.isArray(response.data?.data) ? response.data.data : [];
            console.log(funatworkData)
            setFunatworkCategory(funatworkData); // Store fetched subcourses
        } catch (err) {
            console.error("Error fetching fun at work data:", err);
        }
    };
    useEffect(() => {

        fetchfunatworkcategoryData();
    }, []);



    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !description || !image || !category_name) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const BASE_URL = "https://api.sumagotraining.in/public/api";
            const accessToken = localStorage.getItem("remember_token");

            const payload = {
                funatworkCategory_id,
                title,
                description,
                image,
                category_name,

            };


            const response = await axios.post(`${BASE_URL}/update_funatworkdetails/${funatworkdetailsData.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data?.status === "Success") {
                toast.success("Fun at work details updated successfully!");
                navigate("/funatworkdatadetails");

                // Clear form
                setFunatworkCategory("");
                setTitle("");
                setDescription("");
                setImage(null);
                setPreview(null);
                setCategory_name("");


            } else {
                toast.error("Failed to update fun at work details.");
            }
        } catch (err) {
            console.error("Error uploading fun at work details:", err);
            toast.error("Something went wrong.");
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
                                                    UPDATE <span className="highlight">FUN AT WORK DATA</span>
                                                </b>
                                            </div>
                                        </Container>
                                        <Button className="me-3 fs-5 text-nowrap"
                                            style={{ whiteSpace: "nowrap" }} variant="secondary" onClick={() => navigate('/funatworkdatadetails')}>
                                            Fun at work data Details
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Fun at Work Category</Form.Label>
                                                <Form.Select
                                                    value={funatworkCategory_id}
                                                    onChange={(e) => {
                                                        const selected = funatworkcategory.find(cat => cat.id.toString() === e.target.value);
                                                        if (selected) {
                                                            setFunatworkCategory_id(selected.id); // id = funatworkcategoryid
                                                            setCategory_name(selected.title);     // title = category_name
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- Select Category --</option>
                                                    {funatworkcategory.map(cat => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.title}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    as={"textarea"}
                                                    placeholder="Enter description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Upload Image (Drag and Drop or Click)</Form.Label>
                                                <div
                                                    className="border p-4 text-center"
                                                    onChange={(e) => handleImageUpload(e.target.files[0])}
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
export default UpdateFunatworkData;