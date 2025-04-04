import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FaUsers, FaFileCode, FaUserGraduate , FaClipboardList, FaDatabase , FaFile, FaListAlt  } from "react-icons/fa";
import "../submenus/completion.css";
import logo1 from "../imgs/SCOPE FINAL LOGO Black.png";
import logo2 from "../imgs/SUMAGO Logo (2) (1).png";
import corner from "../imgs/file (28).png";




// Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const TrainingDashboard = () => {
  const [courseData, setcourseData] = useState([]);
  const [subcourseData, setsubcourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("remember_token");

      // Fetch Courses Data
      const coursesResponse = await axios.get(
        "https://api.sumagotraining.in/public/api/get_course",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fetch Completion Students Data
      const subcourseResponse = await axios.get(
        "https://api.sumagotraining.in/public/api/get_all_subcourses",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Intern Data:", coursesResponse.data);
      console.log("Completion Data:", subcourseResponse.data);

      setcourseData(coursesResponse.data);
      setsubcourseData(subcourseResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };



  // Calculate Summary
  const totalcourse = courseData?.data?.length ? courseData.data.length.toString().padStart(2, '0') : "00";
  const totalsubcourse = subcourseData?.data?.length ? subcourseData.data.length.toString().padStart(2, '0') : "00";

  const t3Sheet = totalcourse;

  // UI Card Data
  const summaryCards = [
    { label: "Total Courses", value: totalcourse, icon: <FaUsers size={40} className="text-danger" />, link: "/coursedetails" },
    { label: "Total SubCourses", value: totalsubcourse, icon: <FaFileCode size={40} className="text-secondary" />, link: "/subcoursedetails" },
    { label: "Alumni", value: totalsubcourse, icon: <FaUserGraduate  size={40} className="text-warning-subtle" />, link: "/alumnidetails" },
    { label: "Handson Project", value: t3Sheet, icon: <FaDatabase  size={40} className="text-primary" /> },
    { label: "MOU", value: t3Sheet, icon: <FaFile  size={40} className="text-danger" /> },
    { label: "Mentor", value: t3Sheet, icon: <FaUsers size={40} className="text-success" /> },
    { label: "Expert Review", value: t3Sheet, icon: <FaClipboardList size={40} className="text-primary" /> },
    { label: "Top Rank", value: t3Sheet, icon: <FaListAlt  size={40} className="text-info" /> },


  ];


 
  return (
    <>

      <div className="container idcardbackimg">
        <div>
          <img src={corner} className="corner_img" alt="Responsive Corner" />
        </div>
        <div
          className="logo-container"
        >
          <img src={logo1} class="img-fluid logo1" alt="..." />
          <img src={logo2} className="img-fluid logo2" alt="..." />
        </div>
        <Container>
          <div className="text-center title-container">
            <b className="title-text highlight">
            Dashboard
            </b>
          </div>
        </Container>

        <Container className="mt-4">
          <h2 className="text-center mb-4"></h2>

          {/* Summary Cards Row */}
          <Row>
            {summaryCards.map((card, index) => (
              <Col key={index} md={3}>
                <Link to={card.link} style={{ textDecoration: "none", color: "inherit" }}>
                  <Card className="p-3 text-center shadow-sm clickable-card mt-0 mb-5">
                    <div className="d-flex align-items-center justify-content-start gap-4">
                      {card.icon}
                      <p className="mb-0 text-muted  ms-3 fs-5" >{card.label}</p>
                    </div>
                    <hr></hr>
                    <p className="align-items-center mb-0 ms-3 fs-4">{card.value}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>




        </Container>
      </div>
    </>
  );
};
export default TrainingDashboard;
