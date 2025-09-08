import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Files from "./pages/Files";
import AdminAuth from "./pages/AdminAuth"
import AdminControl from "./pages/AdminControl"

// bootstrap
import * as bootstrap from 'bootstrap';
import '../src/scss/styles.scss'



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/users" element={<AdminControl />} />
          <Route path="Files" element={<Files />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
