import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import SERVER_URL from '../config';


function Login() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [processing, setProcessing] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    function loginUser(credentials) {

        setProcessing(true);
        setShowError (false)
    
        fetch(SERVER_URL + '/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          })
            .then(data => data.json()).then(MYJSON =>{
                
    
                setProcessing(false);

                console.log(MYJSON);
    
    
                if(MYJSON.statusCode == 401)
                {   
                    setErrorMessage("Your user is not authorized")
                    setShowError (true)

          
                }
                else
                {
                   
                    localStorage.setItem('token', JSON.stringify(MYJSON.access_token));
                    navigate("/")
                    window.location.reload(true);                  
    
     
                }
    
                
    
            })
    
    
    }


    const handleSubmit = async e => {
        e.preventDefault();
        loginUser({ username: username, password: password });
      }



  return (
    
    <div className="container">
    <div className="row">
      <div className="col-md-12 ">
 

        <h2 className="text-center text-dark mt-5">User CRUD Login</h2>
        <div className="text-center mb-5 text-dark">Login to your account to interact with your customers</div>
        <div className="card my-5" id="login-form1">

          <form onSubmit={handleSubmit} className="card-body cardbody-color p-lg-5">

            <div className="text-center">
 
            </div>

    {
        showError == true ? 
        <div className="alert alert-danger">{errorMessage}</div> : <></> 
    }



            {
                        processing == true ? 
       
                        <LoadingSpinner></LoadingSpinner>: <></>


            }

         

            <div className="mb-3">
              <input type="text" className="form-control" id="Username" onChange={e => setUserName(e.target.value)} aria-describedby="emailHelp"
                placeholder="Username..." />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} placeholder="Password..." />
            </div>
            <div className="text-center"><button type="submit" className="btn btn-dark btn-big px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" className="form-text text-center  text-dark">Not registered? <a href="" onClick={() =>{ alert("we dont have this yet") }}  className="text-dark fw-bold"> Create an Account</a> </div>
            <div id="emailHelp" className="form-text text-center mb-5 text-dark"><a href="" onClick={() =>{ alert("we dont have this yet") }} className="text-dark fw-bold">Lost your password ?</a>
            </div>
          </form>
        </div>

      </div>
    </div></div>
  )
}

export default Login;
