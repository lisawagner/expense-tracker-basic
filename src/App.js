import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

// pages
import Home from './pages/home/Home'
import Budget from './pages/budget/Budget';
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
            <Route path="/" element={
              !user
              ? <Navigate to='/login' />
              : <Budget />
            } />
            <Route path="/login" element={
              user
              ? <Navigate to='/' />
              : <Login />
            } />
            <Route path="/signup" element={
              user
              ? <Navigate to='/' />
              : <Signup/>
            } />
            {/* Wildcard route sends you home/about */}
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
