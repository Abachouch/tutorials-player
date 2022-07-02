import React from "react";
import "./style/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TutorialPage from "./pages/TutorialPage";
import HomePage from "./pages/HomePage";
import TitleBarComponent from "./components/Titlebar";
function App() {
  return (
    <div className="App">
      <TitleBarComponent />
      <main id="l-main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutorial/:id" element={<TutorialPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
