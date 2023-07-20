import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link to="/"><img src={require("../image/logo.png")} alt='Company Logo' className={styles.imge}/></Link>
      <h4 className={styles.mystery}><Link to="/" className={styles.link} key="skjdnck">Hotels</Link></h4>
      <h4 className={styles.history}><Link to="/" className={styles.link} key="jnsdkcj">Properties</Link></h4>
      <h4 className={styles.technology}><Link to="/login" className={styles.link} key="skjdbvc">Login/Signup</Link></h4>
    </div>
  );
}