
import React, { useState, useContext } from 'react';
import SERVER_URL from '../config';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Home() {

    const myContext = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');


    const navigate = useNavigate();

    const [success, setSuccess] = useState('');

  const [error, setError] = useState('');

  const users = myContext.users;

    const openModal = () => {
      setSuccess("");
      setError("");
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

      const resetForm = () => {
        setName('');
        setEmail('');
        setTelephone('');
      };
    

      const handleAddUser = async () => {


        if (name.trim() === '') {
          setSuccess('');
            setError('Name is required.');
            return;
          }
      
          if (!validateEmail(email)) {
            setError('Invalid email address.'); setSuccess('');
            return;
          }
      
          if (!validateTelephone(telephone)) {
            setError('Invalid telephone number.'); setSuccess('');
            return;
          }

          const userData = { 
            name: name,
            email: email,
            phone: telephone,
          };

          const token = myContext.token;  
          console.log(token)

        if (!token) {
        setError('User not authenticated.');
        return;
        }

          
          try {

            let cleanToken = token.replace(/"/g, '');

            const response = await axios.post(SERVER_URL + '/users/', userData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${cleanToken}`
                }
              });


              if(response.status == 200 || response.status == 201)
              {
                
                setError('')
                setSuccess('User added successfully!');
                resetForm();
                //setShowModal(false);

                myContext.getUsers(); //addnewuser(response.data);

              }
              
              console.log(response)
          
          } catch (error) {
            setError('Failed to add user. Please try again.');
          }

 
      };


      const validateEmail = (email) => {
        // Simple email regex validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };
    
      const validateTelephone = (telephone) => {
        // Simple telephone regex validation (e.g., 123-456-7890 or 1234567890)
        return /^\d{10}$/.test(telephone.replace(/-/g, ''));
      };
    
function logoutMe()
{
    myContext.logout();
    navigate("/login")
}


function changePage(pg)
{
  console.log(pg)
    myContext.setCurrentPage(pg);
    myContext.getUsers(pg);
}


function displayPages()
{
  let itemIt = [];
              for(let i=1; i<= myContext.totalPages; i++)
              {
                itemIt.push ( <li className={i == myContext.currentPage ? 'page-item active' : 'page-item' }><a className="page-link" href="#" onClick={() =>{
                  changePage(i)
                }}>{i}</a></li>);
              }

              return itemIt
}

  return (
    <div className='container-fluid'>


{showModal &&
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              {success && <div className="alert alert-success" role="alert">{success}</div>}

                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telephone" className="form-label">Telephone</label>
                    <input type="text" className="form-control" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleAddUser}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      }



<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">User CRUD</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home</a>
      <a class="nav-item nav-link" href="#" onClick={openModal}>Add New User</a>
      <a class="nav-item nav-link" href="#" onClick={logoutMe}>Logout</a>

    </div>
  </div>
</nav>






<div className="row"><div className="col-12 col-md-2"></div><div className="col-12 col-md-8">


<h2 className='mt-5 mb-3'>Users List</h2>
{
  users.length == 0 ?
  <>
  <p>There are no users yet.</p>
  </> :

<table className="table table-striped">
      <thead>
        <tr>
        <th>Name</th>
        <th>Email</th>
          <th>Telephone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(element => {

              return(
                <tr>
        <td>{element.name}</td>
          <td>{element.email}</td>
          <td>{element.phone}</td>
          <td>
            <button onClick={()=>{
              myContext.deleteUser(element.id)
            }} className="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
              )
            
          })
        }       
   

      </tbody>
    </table> }
    
    
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          {
           displayPages()
          }
      
        </ul>
    </nav>
    
    
    </div>



    <div className="col-12 col-md-2"></div>
    </div>
      
    </div>
  )
}
