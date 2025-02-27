import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Updatecoursefees = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseData = location.state || {};

  const [title, setTitle] = useState(courseData.title || "");
   const [coursename, setCoursename] = useState("");
      const [subcourses_name, setSubcourses_name] = useState("");
  
      const [job_assistance, setjob_assistance] = useState("");
      const [live_class_subscription, setlive_class_subscription] = useState("");
      const [lms_subscription, setlms_subscription] = useState("");
      const [domain_training, setdomain_training] = useState("");
      const [project_certification_from_companies, setproject_certification_from_companies] = useState("");
      const [capstone_projects, setcapstone_projects] = useState("");
      const [adv_ai_dsa, setadv_ai_dsa] = useState("");
      const [industry_projects, setindustry_projects] = useState("");
      const [job_referrals, setjob_referrals] = useState("");
      const [microsoft_certification, setmicrosoft_certification] = useState("");
      const [sub_course_fee, setsub_course_fee] = useState("");
      const [sub_course_duration, setsub_course_duration] = useState("");

        const [feeCategories, setFeeCategories] = useState([]);
          const [selectedFeeCategory, setSelectedFeeCategory] = useState("");
    const [courses, setCourses] = useState([]);
      const [Subcourses, setSubcourses] = useState([]);
      const [coursefees, setCoursefees] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    navigate(-1); // Go back to the previous page
  };

//   useEffect(() => {
//          fetchCourses();
//          fetchSubcourses();
//          fetchcoursefees();
//          fetchFeeCategories();
//      }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!courseData.id) {
      toast.error("Invalid course ID.");
      return;
    }

    const token = localStorage.getItem("remember_token");
    const formData = new FormData();
    formData.append("course_id", course_id);
    formData.append("name", coursename);
    formData.append("job_assistance", job_assistance);
    formData.append("live_class_subscription", live_class_subscription);
    formData.append("lms_subscription", lms_subscription);
    formData.append("domain_training", domain_training);
    formData.append("project_certification_from_companies", project_certification_from_companies);
    formData.append("capstone_projects", capstone_projects);
    formData.append("adv_ai_dsa", adv_ai_dsa);
    formData.append("industry_projects", industry_projects);
    formData.append("job_referrals", job_referrals);
    formData.append("microsoft_certification", microsoft_certification);
    formData.append("sub_course_fee", sub_course_fee);
    formData.append("sub_course_duration", sub_course_duration);
    try {
      const response = await fetch(
        `https://api.sumagotraining.in/public/api/update_course_fee_details/${courseData.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log("Updating Course fees ID:", courseData.id);

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
        <Modal.Title>Update Course fees </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
             <Form.Group className="mb-3">
                                       <Form.Label>Program Fee Category</Form.Label>
                                       <Form.Select
                                           value={selectedFeeCategory}
                                           onChange={(e) => setSelectedFeeCategory(e.target.value)}
                                       >
                                           <option value="">-- Select pro max category --</option>
                                           {[...new Set(feeCategories.map((category) => category.title))].map((uniqueTitle, index) => (
                                               <option key={index} value={uniqueTitle}>
                                                   {uniqueTitle}
                                               </option>
                                           ))}
                                       </Form.Select>
                                   </Form.Group>
           
           
           
                                   <Form.Group className="mb-3">
                                            <Form.Label>Course Name</Form.Label>
                                              <Form.Select
                                                value={coursename}
                                                onChange={(e) => {
                                                  const selectedCourse = courses.find((course) => course.name === e.target.value);
                                                  if (selectedCourse) {
                                                    setCoursename(selectedCourse.name); // Set coursename
                                                    setCourseId(selectedCourse.id); // Set course_id
                                                  }
                                                }}
                                              >
                                                <option value="">-- Select Course --</option>
                                                {courses.map((course) => (
                                                  <option key={course.id} value={course.name}>
                                                    {course.name}
                                                  </option>
                                                ))}
                                              </Form.Select>
                                              </Form.Group>
                                  
                                  
           
           
                                   <Form.Group className="mb-3">
                                       <Form.Label>Subcourse Name</Form.Label>
                                       <Form.Select
                                           value={subcourses_name}
                                           onChange={(e) => setSubcourses_name(e.target.value)}
                                       >
                                           <option value="">-- Select Subcourse --</option>
                                           {Subcourses.filter((subcourse) => subcourse.coursename === coursename).map(
                                               (subcourse) => (
                                                   <option key={subcourse.id} value={subcourse.subcourses_name}>
                                                       {subcourse.subcourses_name}
                                                   </option>
                                               )
                                           )}
                                       </Form.Select>
                                   </Form.Group>
           
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Appointment Letter"
                                           value={job_assistance}
                                           onChange={(e) => setjob_assistance(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Mock Interview"
                                           value={live_class_subscription}
                                           onChange={(e) => setlive_class_subscription(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Live Project"
                                           value={lms_subscription}
                                           onChange={(e) => setlms_subscription(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Completion Certificate"
                                           value={domain_training}
                                           onChange={(e) => setdomain_training(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Experience Letter"
                                           value={project_certification_from_companies}
                                           onChange={(e) => setproject_certification_from_companies(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Job Assistance"
                                           value={capstone_projects}
                                           onChange={(e) => setcapstone_projects(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Resume Building"
                                           value={adv_ai_dsa}
                                           onChange={(e) => setadv_ai_dsa(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Job Guarantee"
                                           value={industry_projects}
                                           onChange={(e) => setindustry_projects(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Job Refferal"
                                           value={job_referrals}
                                           onChange={(e) => setjob_referrals(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="Training Support (1 Year)"
                                           value={microsoft_certification}
                                           onChange={(e) => setmicrosoft_certification(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="sub course fee"
                                           value={sub_course_fee}
                                           onChange={(e) => setsub_course_fee(e.target.value)}
                                       />
                                   </Form.Group>
           
                                   <Form.Group className="mb-3">
                                       <Form.Control
                                           type="text"
                                           placeholder="sub course duration"
                                           value={sub_course_duration}
                                           onChange={(e) => setsub_course_duration(e.target.value)}
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

export default Updatecoursefees;
