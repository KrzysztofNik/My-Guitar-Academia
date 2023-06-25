import './App.css';
import React from 'react'
import { Link }  from 'react-router-dom'

function App() {
    return (
      <nav>
          <h4>Main page</h4>
          <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/auth/login'>Login</Link></li>
              <li><Link to="/auth/register">Register</Link></li>
          </ul>
     </nav>
  );
}
export default App;
