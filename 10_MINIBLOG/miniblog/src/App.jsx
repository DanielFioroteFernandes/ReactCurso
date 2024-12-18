//CSS

import "./App.css";

//FireBase

import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useAuthentication } from "./hooks/useAuthentication";

//React
import { useState, useEffect } from "react";

//react router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// context
import { AuthProvider } from "./context/AuthContext";

// componentes
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// pages
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregamendo...</p>;
  }

  return (
    <>
      <div className="App">
        <AuthProvider value={{ user }}>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate />}
                />
                <Route
                  path="/register"
                  element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route
                  path="/posts/create"
                  element={user ? <CreatePost /> : <Navigate to="/login" />}
                />
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
