import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import AddReading from "./Pages/AddReading";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ViewBill from "./Pages/ViewBill";
import AuthRoutes from "./Utils/AuthRoutes";
import PrivateRoutes from "./Utils/PrivateRoutes";
import RegisterMeterReader from "./Pages/RegisterMeterReader";

function App() {

  return (
    <div>
      <div className="min-h-screen relative">
        <Router>
          <div>
            <Navbar />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/viewbill" element={<ViewBill />} />

                <Route element={<AuthRoutes />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<RegisterMeterReader />} />
                </Route>

                <Route element={<PrivateRoutes />}>
                  <Route path="/addreading" element={<AddReading />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
