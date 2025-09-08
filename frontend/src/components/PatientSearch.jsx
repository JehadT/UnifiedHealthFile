import File from "./File";
import axios from "axios";
import PatientRecords from "../components/PatientRecords";
import NewRecord from "./NewRecord";
import PatientMedicines from "./PatientMedicines";
import Swal from "sweetalert2";

import { useState } from "react";

const PatientSearch = ({
  setShowNewPatientBtn,
  handleAddingPatient,
  patientInfo,
  setPatientInfo,
}) => {
  const [patientId, setPatientId] = useState("");
  const [showPatientRecords, setShowPatientRecords] = useState(false);
  const [showPatientMedicines, setShowPatientMedicines] = useState(false);
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [showBackButtonToFile, setShowBackButtonToFile] = useState(false);

  // Patient Medicines props
  const [medicines, setMedicines] = useState([]);
  const [medicineCount, setMedicineCount] = useState(0);
  // Patient Records props
  const [records, setRecords] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [error, setError] = useState(null);
  const [errorSearching, setErrorSearching] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowNewPatientBtn(false);
      setPatientInfo(response.data.patient);
      setErrorSearching(null);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        customClass: "Swal-wide",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error.response.data.msg);
    }
  };
  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/patients/records/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecords(response.data.records);
      setRecordCount(response.data.count);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/patients/medicines/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMedicines(response.data.medicines);
      setMedicineCount(response.data.count);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleBackToFile = () => {
    setShowPatientRecords(false);
    setShowBackButtonToFile(false);
    setShowNewRecord(false);
    setShowPatientMedicines(false);
    setRecords([]);
    setRecordCount(0);
    setMedicines([]);
    setMedicineCount(0);
  };
  const handleBackToSearch = () => {
    setPatientInfo(null);
    setPatientId("");
    setShowNewPatientBtn(true);
  };

  const handleShowPatientRecords = () => {
    setShowPatientRecords(true);
    setShowBackButtonToFile(true);
    fetchRecords();
  };
  const handleShowPatientMedicines = () => {
    setShowPatientMedicines(true);
    setShowBackButtonToFile(true);
    fetchMedicines();
  };

  const handleShowNewRecord = () => {
    setShowNewRecord(true);
    setShowBackButtonToFile(true);
  };

  return (
    <div>
      {errorSearching && <p>{errorSearching}</p>}
      {!patientInfo ? (
        <div
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <button
            className="btn btn-outline-primary mb-4"
            onClick={handleAddingPatient}
          >
            Add New Patient
          </button>
          <div
            className="text-center p-5 mb-5"
            style={{
              backgroundColor: "#161a30",
              borderRadius: "20px",
              width: "38%",
            }}
          >
            <h3 className="mb-3" style={{ color: "white" }}>
              Patient ID
            </h3>
            <input
              className="form-control mb-2"
              style={{ borderRadius: "5px" }}
              type="text"
              placeholder="National ID..."
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <button
              className="btn btn-primary mt-3"
              style={{ borderRadius: "5px" }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            {!showPatientRecords && !showNewRecord && !showPatientMedicines && (
              <>
                <button
                  className="btn btn-link custom-margin"
                  onClick={handleBackToSearch}
                >
                  Back
                </button>
                <div className="container mt-5">
                  <div className="row">
                    <div className="col">
                      <h1>Patient Information</h1>
                    </div>
                    <div className="col text-end">
                      <button
                        className="btn btn-outline-primary mx-4"
                        onClick={handleShowPatientMedicines}
                      >
                        Medicines
                      </button>
                      <button
                        className="btn btn-outline-primary mx-4"
                        onClick={handleShowPatientRecords}
                      >
                        Previous Records
                      </button>
                      <button
                        className="btn btn-outline-primary mx-4"
                        onClick={handleShowNewRecord}
                      >
                        New Record
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {!showPatientRecords && !showNewRecord && !showPatientMedicines && (
            <File
              patientId={patientInfo.patientId}
              name={patientInfo.name}
              dateOfBirth={patientInfo.dateOfBirth}
              phoneNumber={patientInfo.phoneNumber}
              gender={patientInfo.gender}
              bloodType={patientInfo.bloodType}
              height={patientInfo.height}
              weight={patientInfo.weight}
              address={patientInfo.address}
              insurance={patientInfo.insurance}
              formatDate={formatDate}
            />
          )}

          {showBackButtonToFile && (
            <button
              className="btn btn-link custom-margin"
              onClick={handleBackToFile}
            >
              Back
            </button>
          )}
          {showPatientRecords && (
            <PatientRecords
              records={records}
              recordCount={recordCount}
              error={error}
              formatDate={formatDate}
              setShowBackButtonToFile={setShowBackButtonToFile}
              fetchRecords={fetchRecords}
            />
          )}

          {showPatientMedicines && (
            <PatientMedicines
              patientId={patientId}
              medicines={medicines}
              medicineCount={medicineCount}
              error={error}
              formatDate={formatDate}
              setShowBackButtonToFile={setShowBackButtonToFile}
              fetchMedicines={fetchMedicines}
            />
          )}
          {showNewRecord && (
            <NewRecord
              patientId={patientId}
              handleBackToFile={handleBackToFile}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
