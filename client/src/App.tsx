import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import GeneratePage from "./pages/GeneratePage";
import MyGeneration from "./pages/MyGeneration";
import YtPreviewPage from "./pages/YtPreviewPage";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/generate/:id" element={<GeneratePage />} />
        <Route path="/my-generation" element={<MyGeneration />} />
        <Route path="/preview" element={<YtPreviewPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
