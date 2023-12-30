import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Redirect } from 'react-router-dom';
import Home from './page/Home';
import Classes from './page/Classes';
import Plans from './page/Plans';
import Profile from './page/Profile';
import SignIn from './page/SignIn';
import NotFound from './page/NotFound';
import SignUp from './page/signup1.jsx';

const Routing = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home username={user} />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={user ? <Navigate to="/" /> : <SignIn onSignIn={handleSignIn} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routing;
