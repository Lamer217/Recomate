import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import FilmDetails from './pages/FilmDetails';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/film-details" element={<FilmDetails />} />
      </Routes>
    </div>
  );
}

export default App;
