import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setPatientInfo }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setPatientInfo(null);
    navigate("/");
  };

  return (
    <div className="text-center">
      <button
        className="btn btn-outline-danger btn-sm ms-3 mb-2 "
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
