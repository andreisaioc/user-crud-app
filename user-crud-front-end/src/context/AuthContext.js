
import { createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SERVER_URL from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');  // Redirect to homepage on logout
  };


  async function getUsers(pg = null)
  {

    let pagetosearch = currentPage;

    if(pg != null)
    {
      pagetosearch = pg
    }



    try {
    let cleanToken = token.replace(/"/g, '');

    const response = await axios.get(SERVER_URL + '/users/?page=' + pagetosearch, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken}`
      }
    });

    const responseData = response.data;

    setUsers(responseData.users);
    setTotalPages(responseData.totalPages)

    console.log(responseData)

    } catch (error) {

logout();
      console.error('There was an error!', error);
    }

  }

  function addnewuser(newUser)
  {
    setUsers([...users, newUser]);
  }


  async function deleteUser(id)
  {
    let cleanToken = token.replace(/"/g, '');
    const response = await axios.delete(SERVER_URL + '/users/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken}`
      }
    });

    getUsers();

  }


  useEffect(()=>{


    getUsers();



  }, []);

  return (
    <AuthContext.Provider value={{ token, users, login, setCurrentPage, logout, addnewuser, getUsers, deleteUser, currentPage, totalPages }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
