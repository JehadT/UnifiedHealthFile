import { Link } from "react-router-dom";
import img from "../assets/computer.png";

export default function Home() {
  return (
    <section id="home" className="s-home target-section homepage">
      <div className="overlay"></div>
      <div className="home-content">
        <div className="home-row home-content__main">
          <div className="row">
            <div className="col-md-6">
              <h4>Welcome to the,</h4>
              <h1>
                <strong>Unified Health File.</strong>
              </h1>
              <div className="home-content__buttons">
                <Link to="/files">
                  <button
                    type="button"
                    className="smoothscroll btn btn--stroke fontsize-small"
                  >
                    Get Started
                  </button>
                </Link>
                <Link to="/about">
                  <button
                    type="button"
                    className="smoothscroll btn btn--stroke ms-4"
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-center">
                <img
                  src={img}
                  width="520px"
                  className="img-fluid"
                  alt="Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
