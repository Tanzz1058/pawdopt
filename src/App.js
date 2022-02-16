import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/signup";
import DogList from "./pages/dogList";
import PetDetails from "./pages/petDetails";
import AdoptionForm from "./pages/adoptionForm";
import PetInfoForm from "./pages/petInfoForm";
import OrganisationDetails from "./pages/organisationDetails";
import Applications from "./pages/applications";
import UserDetails from "./pages/userDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="findpets" element={<DogList />} />
        <Route path="pet-details/:id" element={<PetDetails />} />
        <Route
          path="adoption-form/:shelterId/:petId"
          element={<AdoptionForm />}
        />
        <Route path="post-pet-info" element={<PetInfoForm />} />
        <Route path="details" element={<OrganisationDetails />} />
        <Route path="applications" element={<Applications />} />
        <Route path="user-details" element={<UserDetails />} />
        <Route>
          <Route path="" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
