import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

// pages
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Wildcard route sends you home (or 404) */}
            <Route path="*" element={
              !user ? <Navigate to='/login' /> : <Home />
            } />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
