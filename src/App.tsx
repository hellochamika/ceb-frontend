import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import AddReading from "./pages/AddReading";
import ViewBill from "./pages/ViewBill";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
                <Route path="/addreading" element={<AddReading />} />
                <Route path="/viewbill" element={<ViewBill />} />
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
