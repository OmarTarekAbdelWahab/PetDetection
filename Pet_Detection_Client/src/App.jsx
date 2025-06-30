import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './layouts/ProtectedLayout';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import AnalyzePage from './pages/Analyze';
import History from './pages/History';
import About from './pages/About';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login navigateOnSuccess="/" />} />
        <Route path="/signup" element={<SignUp navigateOnSuccess="/" />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="history" element={<History />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
