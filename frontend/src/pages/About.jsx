import img from "../assets/person.png";

export default function About() {
  return (
    <section className="py-3 py-md-5 py-xl-8 d-flex justify-content-center align-items-center center-about">
      <div className="container">
        <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="row">
              <div>
                <h2 className="h1 mb-2">About <strong style={{color: "#3e649e"}}>Unified Health File</strong></h2>
                <p className="lead fs-4 text-secondary mb-4">
                  Platform for managing patient records.
                </p>
                <p className="mb-5">
                  Our system helps hospitals streamline operations, improve
                  patient care, and enhance collaboration among healthcare
                  providers. With strong data security and privacy measures,
                  Unified Health File is a trusted solution for healthcare
                  institutions.
                </p>
                <div className="row gy-4 gy-md-0 gx-xxl-5X">
                  <div className="col-12 col-md-6">
                    <div className="d-flex">
                      <div className="me-4 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="mb-3">Simplifying Healthcare</h4>
                        <p className="text-secondary mb-0">
                          We aim to simplify healthcare management and improve
                          patient outcomes with innovative technology.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="d-flex">
                      <div className="me-4 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="mb-3">Enhancing Healthcare</h4>
                        <p className="text-secondary mb-0">
                          We aim to empower healthcare professionals with
                          efficient tools and improve overall healthcare quality
                          through innovative technology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-5">
            <div className="text-center">
              <img src={img} className="img-fluid" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
