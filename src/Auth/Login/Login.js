import React from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../AuthConnect";

function Login() {

  let navigate = useNavigate();

  if (auth.currentUser != null) navigate("/news");

  const goToSignup = () => {
    navigate("/");
  };
  
  const LoginAccount = async (event) => {
    event.preventDefault()
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    await signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/news");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode:", errorCode);
        console.log("errorMessage:", errorMessage);
        // ..
      });

  }


  return (
    <div className="box02">
      <form autoComplete="off">
        <h2>Login</h2>
        <div className="inputBox02">
          <input type="email" id="email" required="required" />
          <span>Email</span>
          <i></i>
        </div>
        <div className="inputBox02">
          <input type="password" id="pass" required="required" />
          <span>Password</span>
          <i></i>
        </div>
        <div className="links02">
          <span className="text02">First time?</span>
          <button className="btn02" onClick={goToSignup}>Signup</button>
        </div>
        <button className="btn03" onClick={LoginAccount}>Login</button>
      </form>
    </div>
  )
}

export default Login