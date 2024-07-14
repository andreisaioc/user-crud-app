import logo from './logo.svg';
import './App.css';

import { AuthProvider } from './context/AuthContext';

import Home from './screens/Home';
import Login from './screens/Login';

import {
  BrowserRouter,
  Routes, Navigate,
  Route
} from "react-router-dom";


function App() {



  function isUserLoggedInTrue()
  {
        const token = localStorage.getItem('token');
        if (token === undefined || token == null) {
          return false;
        }
        else
        return true;
  }


  const ProtectedRoute = ({ children }) => {
    const user  = isUserLoggedInTrue();
    if (user == false) {
      // user is not authenticated
      return <Navigate to="/login" />;
    }
    return children;
  };
 



  return (
        
    <BrowserRouter>
<AuthProvider>
        <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        </Routes>
        </AuthProvider>
</BrowserRouter>

  );
}

export default App;
