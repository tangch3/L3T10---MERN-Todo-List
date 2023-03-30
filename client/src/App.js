import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/home';
import { Auth } from './pages/auth'

function App() {
  return (
    <div className="App">
      <h1>L3T10 - TODO LIST</h1>
        <Router>
          <Navbar />
          <Routes>

            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            
          </Routes>
        </Router>

    </div>
  );
}

export default App;
