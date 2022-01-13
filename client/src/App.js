import React, { useState } from 'react'
import { Routes, Route ,useNavigate  } from "react-router-dom";
import './App.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./comp/firebase";

import Header from './comp/Header';
import Signup from './comp/Signup';
import Donate from './comp/Donate';
import Login from './comp/Login';
import UserNotFound from './comp/UserNotFound';
import ThanksGiving from './comp/ThanksGiving';

function App() {
  const navigate = useNavigate()

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  
  const [ err, setErr ] = useState(false);


  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

  const register = async () => {
    try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        navigate("/dashboard")

      } catch (error) {
        console.log(error.message);
        if(error.code==="auth/email-already-in-use")
        {
          console.log(error.code);
          setErr("User Already Registered Try Logging In")
        }
        if(error.code==="auth/weak-password")
        {
          setErr("Password Should be at least 6 characters long. ");          
        }
      }
    };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      if(error.code==="auth/wrong-password")
      {
        setErr("Wrong Password, Please Check Your Password")
      }
      if(error.code==="auth/user-not-found")
      {
        setErr("User Not Found. Please Register on the Unsung Beats")
      }

    }
  };


  const logout = async () => {
    // console.log("logout was called")
    await signOut(auth);
    navigate("/")

  };

  return (
    <div className="App h-screen">
      <Header user={user} logout={logout} />
      <Routes>
        {
          (user)?  
            <Route path="/dashboard" element={<Donate user={user} />} />:
            <Route path="/dashboard" element={<UserNotFound />} />
            
        }
        <Route path="/" element={<Signup setRegisterEmail={setRegisterEmail} setRegisterPassword={setRegisterPassword} register={register} err={err} setErr={setErr} />} />
        <Route path="login" element={<Login login={login} setLoginPassword={setLoginPassword} setLoginEmail={setLoginEmail} err={err} setErr={setErr} />} />
        <Route path="/thanks" element={<ThanksGiving />} />
      </Routes>

      {/* <Signup/> */}
    </div>
  );
}

export default App;
