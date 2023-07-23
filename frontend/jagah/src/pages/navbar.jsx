import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';

export default function Navbar() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if there's a token in sessionStorage
    const storedToken = JSON.parse(sessionStorage.getItem('token'));
    if (storedToken) {
      setName(JSON.parse(sessionStorage.getItem('name')));
      setId(JSON.parse(sessionStorage.getItem('id')));
      setToken(storedToken);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Reset the state values
    setName('');
    setId('');
    setToken('');
    // Navigate to the home page after logout
    navigate("/");
  };

  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img src={require('../image/logo.png')} alt="Company Logo" className={styles.imge} />
      </Link>
      <Link to="/hotel" className={styles.link}>
        <h4 className={styles.mystery}>Hotels</h4>
      </Link>
      <h4 className={styles.history}>
        <Link to="/property" className={styles.link}>
          Properties
        </Link>
      </h4>
      <h4 className={styles.technology}>
        <Link to="/booking" className={styles.link}>
          Hotel Bookings
        </Link>
      </h4>
      {token ? (
        <h4 className={styles.technology} onClick={handleLogout}>
          Logout
        </h4>
      ) : (
        <h4 className={styles.technology}>
          <Link to="/login" className={styles.link}>
            Login/Signup
          </Link>
        </h4>
      )}
    </div>
  );
}
