import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
