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

function App() {
  const navigate = useNavigate()

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});


  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // console.log("hello iser",user)

  const register = async () => {
    try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        // console.log(user);
        navigate("/dashboard")

      } catch (error) {
        console.log(error.message);
      }
    };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      // console.log(user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };


  const logout = async () => {
    console.log("logout was called")
    await signOut(auth);
    navigate("/")

  };

  return (
    <div className="App h-screen">
      <Header user={user} logout={logout} />
      <Routes>
        {
          (user &&  
            <Route path="/dashboard" element={<Donate user={user} />} />
            )
        }
        <Route path="/" element={<Signup setRegisterEmail={setRegisterEmail} setRegisterPassword={setRegisterPassword} register={register} />} />
        <Route path="login" element={<Login login={login} setLoginPassword={setLoginPassword} setLoginEmail={setLoginEmail} />} />
        {/* <Route path="/" element={<Donate />} /> */}
      </Routes>

      {/* <Signup/> */}
    </div>
  );
}

export default App;
