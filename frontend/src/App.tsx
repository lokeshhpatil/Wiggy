import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import SelectRole from "./pages/SelectRole";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
// import { UseAppData } from "./context/AppContext";
import Restaurant from "./pages/Restaurant";

const App = () => {
  // const { user } = UseAppData();

  // if (user && user.role === "restaurant") {
  //   return(

  //   )
  // }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/restaurant" element={<Restaurant />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
