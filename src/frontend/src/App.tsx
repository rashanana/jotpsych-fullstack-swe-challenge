import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import AudioRecorder from "./components/AudioRecorder";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile"element={<UserProfile />} />
      <Route path="/audio"element={<AudioRecorder />} />
    </Routes>
  );
}

export default App;
