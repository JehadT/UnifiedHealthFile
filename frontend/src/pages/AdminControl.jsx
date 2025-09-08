import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminControl = () => {
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const navigate = useNavigate();
  const user = localStorage.getItem("userName");

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setUsers(response.data.users);
      setUsersCount(response.data.count);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleVerify = async (id) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.patch(
        `/api/admin/users/${id}`,
        { isValid: "true" },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      fetchUsers();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Verified!",
        customClass: "Swal-wide",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        customClass: "Swal-wide",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleReject = async (id) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.delete(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      fetchUsers();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Rejected!",
        customClass: "Swal-wide",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        customClass: "Swal-wide",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="container">
      <h2 className="mt-5 mb-3 text-center">Users</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {users.map((users) => (
          <Col key={users._id}>
            <Card className="medicine-card mt-4">
              <Card.Body>
                <Card.Title className="text-center mb-3">
                  <h3>{users.name}</h3>
                </Card.Title>
                <Card.Text>
                  <strong>Email: </strong> {users.email}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-primary mt-2"
                    onClick={() => handleVerify(users._id)}
                  >
                    Verify!
                  </button>
                  <button
                    className="btn btn-outline-danger mt-2 ms-4"
                    onClick={() => handleReject(users._id)}
                  >
                    Reject!
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h5 className="mt-5 mb-5">Total Users: {usersCount}</h5>
      <div className="user-info">
        <div className="container" style={{ marginTop: "-60px" }}>
          <h3 className="ms-3" style={{ color: "black" }}>
            <strong>{user}</strong>
          </h3>
          <div className="text-center">
            <button
              className="btn btn-outline-danger btn-sm ms-3 mb-2 "
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
