import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "theme/style.css";
import Reservation from "pages/Reservation";
import NavBar from "components/NavBar";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="main">
        <Routes>
          <Route exact path="/home" element={<Dashboard />} />
          <Route exact path="/reservation" element={<Reservation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
