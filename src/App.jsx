import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './context/privetRoute';
import Login from './components/Login'
import Home from './components/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/forgot';
import ResetPassword from './components/resetPassword';
import NavBar from './components/navBar';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>

          <NavBar />

          <Routes>
            {/* Rutas generales */}
            <Route path="/" element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>

        </Router>
      </AuthProvider >

      <ToastContainer position="top-left" autoClose={3000} />
    </>
  )
}

export default App