
import './app.css';


import Login from './components/Login';
import { db } from "./firebase";
import {
  collection,
  Collections,
  onSnapshot,
  snapshotEqual,
} from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import ThreadList from "./components/ThreadList";
import Nav from "./components/Nav";
import { ThreadProvider } from "./ThreadContext";
import AddThread from "./AddThread";
import Signup from "./components/Signup";

// import { Add } from '@mui/icons-material';
import { AuthContextProvider } from "./authContext";
import { BrowserRouter, BrowserRouter as Router, Route,Routes,Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./components/Account";
import { Link } from "react-router-dom/dist";
import House from './components/House';


function App() {
  // useEffect(() => {
  //   onSnapshot(collection(db, 'post'), (snapshot) => {
  //     AddThread(snapshot.docs.map(doc => doc.data()))
  //   })
  // }, [input]);

  return (
    <>
      <AuthContextProvider>
      <ThreadProvider>
        <div>
          <div className="Headder">
            <div className="homeText">HOME / PAGE</div>
          </div>
          <div className="mainFrame">
            <div>
              <Nav></Nav>
              <ThreadList />
            </div>
            <AddThread />
          </div>
        </div>
      </ThreadProvider>
    </AuthContextProvider> 
    <BrowserRouter>
    <Routes>
      {/* <Route path="app" element={<App/>}/> */}
      <Route path="house" element={<House/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
