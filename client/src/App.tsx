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
import { Toaster } from "react-hot-toast";
import ContactUsPage from "./pages/ContactUsPage";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/generate/:id" element={<GeneratePage />} />
        <Route path="/my-generation" element={<MyGeneration />} />
        <Route path="/preview" element={<YtPreviewPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
