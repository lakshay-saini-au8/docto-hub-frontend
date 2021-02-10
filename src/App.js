import { Route, Switch } from "react-router-dom";
// component imports
import Header from "./components/Header/index";

// page imports
import ScrollToTop from "./scrollToTop";
import LoginPage from "./pages/LoginPage/";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SingleDoctor from "./pages/SingleDoctor";
import AllDoctor from "./pages/AllDoctor";
import MedicinePage from "./pages/MedicinePage";
import Footer from "./components/Footer";
import DoctorBooking from "./pages/PateintSidePages/DoctorBooking";
import MedicineDetail from "./pages/MedicineDetail";
const App = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={LoginPage} />
        <Route path="/doctors" component={AllDoctor} />
        <ProtectedRoute path="/dashboard/:subRoute" component={DashBoard} />
        <Route
          exact
          path="/doctor/profile/:doctorId"
          component={SingleDoctor}
        />
        <ProtectedRoute
          path="/doctor/booking/:doctorId"
          component={DoctorBooking}
        />
        <Route exact path="/medicines" component={MedicinePage} />
        <Route
          exact
          path="/medicines/detail/:productId"
          component={MedicineDetail}
        />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
