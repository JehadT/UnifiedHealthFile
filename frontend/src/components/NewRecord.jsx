import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NewRecord = ({ patientId, handleBackToFile }) => {
  const [formData, setFormData] = useState({
    doctorName: "",
    clinicName: "",
    pulseRate: "",
    bloodPressure: "",
    bodyTemp: "",
    chiefComplaint: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/api/patients/record/${patientId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Record created!",
        customClass: 'Swal-wide',
        showConfirmButton: false,
        timer: 1500
      });
      setFormData({
        doctorName: "",
        clinicName: "",
        pulseRate: "",
        bloodPressure: "",
        bodyTemp: "",
        chiefComplaint: "",
        notes: "",
      });
      handleBackToFile();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        customClass: 'Swal-wide-wide',
        showConfirmButton: false,
        timer: 1500
      });
      console.error(error.response.data.msg);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-5 text-center">New Record</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="doctorName" className="form-label">
              Doctor Name:
            </label>
            <input
              className="form-control"
              id="doctorName"
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter Doctor's Name"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="clinicName" className="form-label">
              Clinic Name:
            </label>
            <input
              className="form-control"
              id="clinicName"
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              placeholder="Enter Clinic Name"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="pulseRate" className="form-label">
              Pulse Rate: (optional)
            </label>
            <input
              className="form-control"
              id="pulseRate"
              type="number"
              name="pulseRate"
              value={formData.pulseRate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="bloodPressure" className="form-label">
              Blood Pressure: (optional)
            </label>
            <input
              className="form-control"
              id="bloodPressure"
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="bodyTemp" className="form-label">
              Body Temperature: (optional)
            </label>
            <input
              className="form-control"
              id="bodyTemp"
              type="number"
              name="bodyTemp"
              value={formData.bodyTemp}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="chiefComplaint" className="form-label">
            Chief Complaint:
          </label>
          <textarea
            className="form-control"
            id="chiefComplaint"
            rows="10"
            type="text"
            name="chiefComplaint"
            value={formData.chiefComplaint}
            onChange={handleChange}
            placeholder="Enter Chief Complaint"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes: (optional)
          </label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-1 mb-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewRecord;
