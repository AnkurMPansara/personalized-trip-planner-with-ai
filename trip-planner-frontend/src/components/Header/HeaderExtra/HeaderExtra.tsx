import React from 'react';
import styles from './HeaderExtra.module.css';

const HeaderExtra: React.FC = () => {
  return (
    <div className={styles.headerExtra}>
      <div className={styles.topSection}>
        <select className={styles.dropdown} defaultValue='Customer Service'>
          <option>Customer Service</option>
          <option>FAQ</option>
          <option>Contact</option>
        </select>

        <select className={styles.dropdown} defaultValue='INR'>
          <option>INR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>

      <div className={styles.bottomSection}>
        <button className={styles.loginBtn}>Login or Signup</button>
      </div>
    </div>
  );
};

export default HeaderExtra;
