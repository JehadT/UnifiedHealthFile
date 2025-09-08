import { useState } from "react";
import axios from "axios";
import SingleRecord from "../components/SingleRecord";
import { Card, Button, Row, Col } from "react-bootstrap";


const PatientRecords = ({
  records,
  recordCount,
  error,
  formatDate,
  setShowBackButtonToFile,
  fetchRecords,
}) => {
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [errorSingleRecord, setErrorSingleRecord] = useState(null);
  const [record, setRecord] = useState(null);

  const fetchSingleRecord = async (recordId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/patients/record/${recordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecord(response.data.record);
      setSelectedRecordId(recordId);
      setShowBackButtonToFile(false);
      setErrorSingleRecord(null);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleBackClick = () => {
    setSelectedRecordId(null);
    setRecord(null);
    setErrorSingleRecord(null);
    setShowBackButtonToFile(true);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {errorSingleRecord && <p>{errorSingleRecord}</p>}
      {!selectedRecordId && (
        <div className="container">
          <h2 className="mt-5 mb-5 text-center">Previous Records</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            {records.map((record) => (
              <Col key={record._id}>
                <Card className="record-card text-center">
                  <Card.Body>
                    <Card.Title>
                      <h4> {record.hospitalName}</h4>
                    </Card.Title>
                    <Card.Text className="CardText">
                      Clinic: {record.clinicName} <br />
                      {formatDate(record.createdAt)}
                    </Card.Text>
                    <Button
                      variant="light"
                      className="w-100 mt-2"
                      onClick={() => fetchSingleRecord(record._id)}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h5 className="mt-5 mb-5">Total Records: {recordCount}</h5>
        </div>
      )}
      {selectedRecordId && (
        <div>
          <button
            className="btn btn-link custom-margin"
            onClick={handleBackClick}
          >
            Back
          </button>
          <SingleRecord
            recordId={record._id}
            patientId={record.patientId}
            hospitalName={record.hospitalName}
            doctorName={record.doctorName}
            clinicName={record.clinicName}
            pulseRate={record.pulseRate}
            bloodPressure={record.bloodPressure}
            bodyTemp={record.bodyTemp}
            chiefComplaint={record.chiefComplaint}
            notes={record.notes}
            createdAt={record.createdAt}
            formatDate={formatDate}
            handleBackClick={handleBackClick}
            fetchRecords={fetchRecords}
          />
        </div>
      )}
    </div>
  );
};

export default PatientRecords;
