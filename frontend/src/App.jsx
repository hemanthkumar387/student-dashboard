import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import Login from './components/Login/Login';
import StudentList from './components/studentList/studentList';
import AddStudent from './components/studentForm/studentForm';
import Navbar from './components/Navbar/Navbar';
import WelcomePage from './components/Main/Main';
import './App.css';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('list');
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:5000/students')
        .then(res => res.json())
        .then(data => {
          setStudents(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setActiveView('list');
    navigate('/students');
  };

  const handleToggleForm = () => {
    if (activeView === 'list') {
      setActiveView('add');
      navigate('/add');
    } else {
      setActiveView('list');
      navigate('/students');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setActiveView('list');
    navigate('/');
  };

  return (
    <div className="app-container">
      {user && location.pathname !== '/' && (
        <Navbar
          activeView={activeView}
          onToggleForm={handleToggleForm}
          onLogout={handleLogout}
        />
      )}
      {authLoading ? (
        <div className="loading">
          <div className='loading-spinner'></div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/" element={<WelcomePage onStart={() => navigate(user ? '/students' : '/login')} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route
            path="/students"
            element={user ? (
              <StudentList students={students} filter={filter} setFilter={setFilter} loading={loading} />
            ) : (
              <Navigate to="/login" replace />
            )}
          />
          <Route
            path="/add"
            element={user ? (
              <AddStudent students={students} user={user} onAddStudent={handleAddStudent} />
            ) : (
              <Navigate to="/login" replace />
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
