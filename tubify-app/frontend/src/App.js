import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import './main.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
    
        <Footer />
      </div>
    </Router>
  );
}

export default App;
