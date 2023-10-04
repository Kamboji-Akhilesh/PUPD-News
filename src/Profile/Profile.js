import React from 'react'
import './Profile.css'
import pic from './man5.png'
import lvl1 from './lvl1.png'
import { getDatabase, ref, get, child } from "firebase/database";
import { auth } from '../Auth/AuthConnect';
import { useNavigate } from 'react-router-dom'

function Profile() {

    let navigate = useNavigate();

    const logout = () => {
        auth.signOut();
        navigate("/");
    }
    
    const intervalId = setInterval(function() {
        connect();
        clearInterval(intervalId);
        return;
    }, 1000);


    const connect = () => {
        var n;
        const dbref = ref(getDatabase());
        const userId = auth.currentUser.uid;
        get(child(dbref, 'users/' + userId)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                n = snapshot.val().points / 30;
                document.getElementById('name').innerHTML=snapshot.val().name;
                document.getElementById('points').innerHTML="Points: "+snapshot.val().points;
                document.getElementById('email').innerHTML="Email: \n"+snapshot.val().email;
                document.getElementById('phno').innerHTML="Phone No: \n"+snapshot.val().phno;
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        console.log(n);
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="main-profile">
                        <img className='profile-pic' src={pic} alt=''/>
                        <div className="profile-names">
                            <h1 className="username" id='name'>Name</h1>
                            <small className="page-title">News is key for GK</small>
                        </div>
                    </div>
                </div>

                <div className="profile-body">
                    <div className="profile-actions">
                        <button className='follow' id='points'>Points</button>
                        <button className="message" id='email'>Email</button>
                        <button className="message" id='phno'>Phone no</button>
                        <section className="bio">
                            <div className="bio-header">
                                <i className="fa fa-info-circle"></i>
                                Bio
                            </div>
                            <p className="bio-text">
                                Lorem ipsum dolor, sit amet consectetur (Comming soon)...
                            </p>
                        </section>
                        <button className="message" onClick={logout} id='logout'>LOG OUT</button>
                    </div>
                    <div className="account-info">
                        <div className="data">
                            <p className='bio'>You achieved the following rewards</p>
                            <div className='important-data'>
                                <section className='data-item'>
                                    <h3 className='value'>NewBie</h3>
                                    <img width={"200pt"} src={lvl1} alt=''></img>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile