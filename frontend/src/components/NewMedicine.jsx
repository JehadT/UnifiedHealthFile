import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NewMedicine = ({ patientId, handleBackToMedicine, fetchMedicines }) => {
  const [formData, setFormData] = useState({
    medicineName: "",
    dosage: "",
    duration: "",
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
      await axios.post(`/api/patients/medicine/${patientId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Medicine added!",
        customClass: "Swal-wide",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({
        medicineName: "",
        dosage: "",
        duration: "",
      });
      handleBackToMedicine();
      fetchMedicines();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        customClass: "Swal-wide",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error.response.data.msg);
    }
  };

  return (
    <>
      <button
        className="btn btn-link custom-margin"
        onClick={handleBackToMedicine}
      >
        Back
      </button>
      <div className="container">
        <h3 className="mt-5 mb-3 text-center">New Medicine</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="medicineName" className="form-label">
              Medicine Name:
            </label>
            <input
              className="form-control"
              id="medicineName"
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              placeholder="Enter Medicine Name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dosage" className="form-label">
              Dosage:
            </label>
            <input
              className="form-control"
              id="dosage"
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="Enter Dosage"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration:
            </label>
            <input
              className="form-control"
              id="duration"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter Duration"
              required
            />
          </div>
          <button className="btn btn-primary mt-1" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewMedicine;
