import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import GeneratePage from "./pages/GeneratePage";
import MyGeneration from "./pages/MyGeneration";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/generate/:id" element={<GeneratePage />} />
        <Route path="/my-generation" element={<MyGeneration />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
