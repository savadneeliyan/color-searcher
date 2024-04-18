import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import HomePageV2 from "./pages/HomePageV2";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/template-1" element={<HomePage />} />
          <Route path="/template-2" element={<HomePageV2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
