import { useState } from "react";
import NewMedicine from "./NewMedicine";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2'


const PatientMedicines = ({
  medicines,
  medicineCount,
  error,
  formatDate,
  patientId,
  fetchMedicines,
  setShowBackButtonToFile,
}) => {
  const [showNewMedicine, setShowNewMedicine] = useState(false);
  const handleNewMedicine = () => {
    setShowNewMedicine(true);
    setShowBackButtonToFile(false);
  };
  const handleBackToMedicine = () => {
    setShowNewMedicine(false);
    setShowBackButtonToFile(true);
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/patients/medicine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMedicines();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Medicine Deleted!",
        customClass: 'Swal-wide',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        customClass: 'Swal-wide',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
      {!showNewMedicine ? (
        <div>
          <div className="container">
            <h2 className="mt-5 mb-3 text-center">Medicines</h2>
            <button
              className="btn btn-outline-primary mb-2"
              onClick={handleNewMedicine}
            >
              Add New Medicine
            </button>
            <Row xs={1} md={2} lg={4} className="g-4">
              {medicines.map((medicines) => (
                <Col key={medicines._id}>
                  <Card className="medicine-card mt-4">
                    <Card.Body>
                      <Card.Title className="text-center mb-3">
                        <h3>{medicines.medicineName}</h3>
                      </Card.Title>
                      <Card.Text>
                        <strong>Hospital: </strong> {medicines.hospitalName}
                        <br />
                        <strong>Dosage: </strong>{medicines.dosage}
                        <br />
                        <strong>Duration: </strong> {medicines.duration}
                        <br />
                        <strong>Date: </strong> {formatDate(medicines.createdAt)}
                        <br />
                      </Card.Text>
                      <div className="d-flex justify-content-center">

                      <button
                        className="btn btn-outline-danger mt-2"
                        onClick={() => handleDelete(medicines._id)}
                      >
                        Delete!
                      </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            
            <h5 className="mt-5 mb-5">
              Total Medicines: {medicineCount}
            </h5>
          </div>
        </div>
      ) : (
        <NewMedicine
          patientId={patientId}
          handleBackToMedicine={handleBackToMedicine}
          fetchMedicines={fetchMedicines}
        />
      )}
    </div>
  );
};

export default PatientMedicines;
