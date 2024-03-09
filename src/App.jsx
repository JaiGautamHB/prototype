import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = () => {
    axios.get(`https://friscoisdhacapi.vercel.app/api/info?username=${username}&password=${password}`)
      .then((res) => {
        setStudentData(res.data);
        setCurrentPage('studentInfo');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <div className="LoginContainer">
          <h1 className="LoginTitle">Login</h1>
          <form>
            <label>
              <input
                placeholder='Username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                placeholder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      )}

      {currentPage === 'studentInfo' && studentData && (
        <div className="StudentInfoContainer">
          <h2>Student Information</h2>
          <p>Name: {studentData.name}</p>
          <p>Birthdate: {studentData.birthdate}</p>
          <p>Campus: {studentData.campus}</p>
          <p>Grade: {studentData.grade}</p>
          {}
        </div>
      )}
    </div>
  );
};

export default App;
