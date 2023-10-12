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
import Profile from "./Pages/Profile";
import StaffList from "./Pages/StaffList";
import AdminRoutes from "./Utils/AdminRoutes ";

function App() {
  return (
    <div  className="bg-slate-100">
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
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<AdminRoutes />}>
                  <Route path="/staff" element={<StaffList />} />
                </Route>

                <Route path="*" element={<h1 className="text-5xl text-center pt-10">Not Found</h1>} />
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
