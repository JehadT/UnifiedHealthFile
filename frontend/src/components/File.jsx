import idPhoto from "../assets/id-photo.png" 

export default function File(props) {
  return (
    <div className="container mt-3">
      <div className="card file-card position-relative">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p>
                <strong className="custom-color">ID:</strong> {props.patientId}
              </p>
              <p>
                <strong className="custom-color">Name:</strong> {props.name}
              </p>
              <p>
                <strong className="custom-color">Date of Birth:</strong>{" "}
                {props.formatDate(props.dateOfBirth)}
              </p>
              <p>
                <strong className="custom-color">Phone Number:</strong> +966{props.phoneNumber}
              </p>
              <p>
                <strong className="custom-color">Gender:</strong> {props.gender}
              </p>
              <p>
                <strong className="custom-color">Blood Type:</strong> {props.bloodType}
              </p>
              <p>
                <strong className="custom-color">Height:</strong> {props.height}
              </p>
              <p>
                <strong className="custom-color">Weight:</strong> {props.weight}
              </p>
              <p>
                <strong className="custom-color">Address:</strong> {props.address}
              </p>
              <p>
                <strong className="custom-color">Insurance:</strong>{" "}
                {!props.insurance ? "None" : props.insurance}
              </p>
            </div>
            <div className="col-4 mt-5">
              <img
                src={idPhoto}
                alt="ID Photo"
                style={{ width: "320px", height: "320px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
