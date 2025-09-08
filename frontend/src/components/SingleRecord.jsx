import axios from "axios";
import Swal from "sweetalert2";

export default function SingleRecord(props) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/patients/record/${props.recordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.handleBackClick();
      props.fetchRecords();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Record Deleted!",
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
    <div className="container mt-5">
    <h3 className="text-center mb-5">Record</h3>
  
    <div className="row mb-2">
      <div className="col-md-6">
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <td>
                <strong>Patient ID:</strong>
              </td>
              <td>{props.patientId}</td>
            </tr>
            <tr>
              <td>
                <strong>Hospital:</strong>
              </td>
              <td>{props.hospitalName}</td>
            </tr>
            <tr>
              <td>
                <strong>Doctor:</strong>
              </td>
              <td>{props.doctorName}</td>
            </tr>
            <tr>
              <td>
                <strong>Clinic:</strong>
              </td>
              <td>{props.clinicName}</td>
            </tr>
            <tr>
              <td>
                <strong>Date:</strong>
              </td>
              <td>{props.formatDate(props.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div className="col-md-6">
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <td>
                <strong>Pulse Rate:</strong>
              </td>
              <td>{!props.pulseRate ? "..." : props.pulseRate}</td>
            </tr>
            <tr>
              <td>
                <strong>Blood Pressure:</strong>
              </td>
              <td>{!props.bloodPressure ? "..." : props.bloodPressure}</td>
            </tr>
            <tr>
              <td>
                <strong>Body Temperature:</strong>
              </td>
              <td>{!props.bodyTemp ? "..." : props.bodyTemp}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <div className="row">
      <div className="col-md-12 mb-3">
        <h5>Chief Complaint:</h5>
        <textarea
          className="form-control"
          value={props.chiefComplaint}
          rows="8"
          readOnly
        ></textarea>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 mb-3">
        <h5>Notes:</h5>
        <textarea
          className="form-control "
          value={!props.notes ? "..." : props.notes}
          readOnly
        ></textarea>
      </div>
    </div>
  
    <button className="btn btn-outline-danger mb-5" onClick={handleDelete}>
      Delete!
    </button>
  </div>
  
  );
}
