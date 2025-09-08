import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/login");
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email: email.toLowerCase(), password }),
    });

    if (response.ok) {
      Swal.fire({
        position: "center",
        icon: "info",
        title:"Pending Confirmation!",
        customClass: 'Swal-wide',
        showConfirmButton: false,
        timer: 2000
      });
      navigate("/login");
    } else {
      const { msg } = await response.json();
      Swal.fire({
        position: "center",
        icon: "error",
        title: msg,
        customClass: 'Swal-wide-wide',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <>
      <button className="btn btn-link custom-margin" onClick={handleBack}>Back</button>
      <section className="py-3 py-md-5 mt-5">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                    Create New Account
                  </h2>
                  <form onSubmit={handleRegister}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Hospital Name"
                            value={name}
                            name="hospitalName"
                            id="hospitalName"
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label htmlFor="hospitalName" className="form-label">
                            Hospital Name
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
