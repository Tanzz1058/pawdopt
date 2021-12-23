import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/signup";
import DogList from "./pages/dogList";
import PetDetails from "./pages/petDetails";
import AdoptionForm from "./pages/adoptionForm";
import PetInfoForm from "./pages/petInfoForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="findpets" element={<DogList />} />
        <Route path="pet-details" element={<PetDetails />} />
        <Route path="adoption-form" element={<AdoptionForm />} />
        <Route path="post-pet-info" element={<PetInfoForm />} />
      </Routes>
    </Router>
  );
}

export default App;
