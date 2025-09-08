import PatientSearch from "../components/PatientSearch";
import NewPatient from "../components/NewPatient";
import UserInfo from "../components/UserInfo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Files = () => {
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [showNewPatientBtn, setShowNewPatientBtn] = useState(true);
  const [showPatientSearch, setShowNewSearch] = useState(true);
  const [patientInfo, setPatientInfo] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddingPatient = () => {
    setShowNewPatient(true);
    setShowNewPatientBtn(false);
    setShowNewSearch(false);
  };
  const handleback = () => {
    setShowNewPatient(false);
    setShowNewPatientBtn(true);
    setShowNewSearch(true);
  };
  return (
    <div>
      {showPatientSearch && (
        <PatientSearch
        patientInfo={patientInfo}
        setPatientInfo={setPatientInfo}
          setShowNewPatientBtn={setShowNewPatientBtn}
          handleAddingPatient={handleAddingPatient}
        />
      )}
      {showNewPatient && (
        <div>
          <button className="btn btn-link custom-margin" onClick={handleback}>
            Back
          </button>
          <NewPatient handleback={handleback} />
        </div>
      )}
      <div className="user-info">
        <UserInfo setPatientInfo={setPatientInfo} />
      </div>
    </div>
  );
};

export default Files;
