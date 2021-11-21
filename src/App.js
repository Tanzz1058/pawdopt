import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/signup";
import DogList from "./pages/dogList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="findpets" element={<DogList />} />
      </Routes>
    </Router>
  );
}

export default App;
