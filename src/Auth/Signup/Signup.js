import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../AuthConnect";

function writeData(userId, email, name,phno,pass) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        email: email,
        name: name,
        phno: phno,
        pass: pass,
        points: 0
    });
}

function Signup() {

    let navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };

    if(auth.currentUser!=null) navigate("/news");

    const createAccount = () => {
        console.log("wpw");
        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;
        var phno = document.getElementById("phno").value;
        var pass = document.getElementById("pass").value;
        var cpass = document.getElementById("cpass").value;
        if (pass === cpass) {
            createUserWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const userId = auth.currentUser.uid.toString();
                    writeData(userId,email,name,phno,pass);
                    console.log(user);
                    navigate("/news")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("errorCode:", errorCode);
                    console.log("errorMessage:", errorMessage);
                }
                );
        }
    };

    return (
        <div className="box">
            <div className="form" autoComplete="off">
                <h2>Sign Up</h2>
                <div className="inputBox">
                    <input type="email" id="email" required="required" />
                    <span>Email</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="text" id="name" required="required" />
                    <span>Name</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="tel" id="phno" required="required" />
                    <span>Phone no</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="password" id="pass" required="required" />
                    <span>Password</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="password" id="cpass" required="required" />
                    <span>Confirm Password</span>
                    <i></i>
                </div>
                <div className="links">
                    <span className="text">Been here before?</span>
                    <button className="btn" onClick={goToLogin}>Login</button>
                </div>
                <button className="btn2" onClick={createAccount}>Sign Up</button>
            </div>
        </div>
    );
}

export default Signup;
