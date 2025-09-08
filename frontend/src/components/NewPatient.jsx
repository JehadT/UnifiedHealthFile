import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NewPatient = ({ handleback }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    bloodType: "",
    height: "",
    weight: "",
    address: "",
    insurance: "",
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
      await axios.post(`/api/patients`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Patient added!",
        customClass: 'Swal-wide',
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({
        patientId: "",
        name: "",
        dateOfBirth: "",
        phoneNumber: "",
        gender: "",
        bloodType: "",
        height: "",
        weight: "",
        address: "",
        insurance: "",
      });
      handleback();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        customClass: 'Swal-wide-wide',
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error.response.data.msg);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">New Patient</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            Patient ID:
          </label>
          <input
            className="form-control"
            type="number"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            id="id"
            placeholder="Enter ID"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            className="form-control"
            id="name"
            placeholder="Enter Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth:
            </label>
            <input
              className="form-control"
              id="dob"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number:
            </label>
            <input
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              className="form-select"
              name="gender"
              id="gender"
              defaultValue={"d"}
              onChange={handleChange}
              required
            >
              <option value="d">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="bloodType" className="form-label">
              Blood Type:
            </label>
            <select
              className="form-select"
              name="bloodType"
              id="bloodType"
              defaultValue={"d"}
              onChange={handleChange}
              required
            >
              <option value="d">Select Blood Type</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="height" className="form-label">
              Height:
            </label>
            <input
              className="form-control"
              id="height"
              placeholder="Enter Height"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="weight" className="form-label">
              Weight:
            </label>
            <input
              className="form-control"
              id="weight"
              placeholder="Enter Weight"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <textarea
            className="form-control"
            id="address"
            rows="2"
            placeholder="Enter Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="insurance" className="form-label">
            Insurance: (optional)
          </label>
          <input
            className="form-control"
            id="insurance"
            type="text"
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPatient;
