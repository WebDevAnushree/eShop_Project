import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";

import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import Success from "./Success";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {

      if (authUser) {
      
        dispatch({
          type: "SET_USER",
          user: authUser,
        });

        // optional (for persistence)
        localStorage.setItem("user", JSON.stringify(authUser));

      } else {
        
        dispatch({
          type: "SET_USER",
          user: null,
        });

        dispatch({
          type: "EMPTY_BASKET",
        });

        localStorage.removeItem("user");
      }

    });

    return () => unsubscribe();
  }, [dispatch]);


   return (
  <Router>
    <div className="App">

      <Header setSearchTerm={setSearchTerm} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success/>} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home searchTerm={searchTerm} />} />
      </Routes>


    </div>
  </Router>
);
}

export default App;