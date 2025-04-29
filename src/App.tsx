import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 