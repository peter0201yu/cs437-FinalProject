import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SettingPage from './pages/SettingPage';
import GenrePage from './pages/GenrePage';
import MainPage from './pages/MainPage';
import './main.css';
import MoodPage from './pages/MoodPage';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/popularities" element={<GenrePage />} />
          <Route path="/moods" element={<MoodPage />} />
        </Routes>
    
        <Footer />
      </div>
    </Router>
  );
}

export default App;
