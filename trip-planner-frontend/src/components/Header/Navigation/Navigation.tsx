import React from 'react';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <a href="https://www.easemytrip.com/flights.html">
            <span className={`${styles.menuicon} ${styles.flighticon}`}></span>
            <span>FLIGHTS</span>
          </a>
        </li>
        <li>
          <a href="https://www.easemytrip.com/hotels/">
            <span className={`${styles.menuicon} ${styles.hotelicon}`}></span>
            <span>HOTELS</span>
          </a>
        </li>
        <li>
          <a href="https://fph.easemytrip.com/">
            <span className={`${styles.menuicon} ${styles.fphicon}`}></span>
            <span>FLIGHT+HOTEL</span>
          </a>
        </li>
        <li>
          <a href="https://www.easemytrip.com/railways/">
            <span className={`${styles.menuicon} ${styles.trainicon}`}></span>
            <span>TRAINS</span>
          </a>
        </li>
        <li>
          <a href="https://www.easemytrip.com/bus/">
            <span className={`${styles.menuicon} ${styles.busicon}`}></span>
            <span>BUS</span>
          </a>
        </li>
        <li>
          <a href="https://www.easemytrip.com/holidays/">
            <span className={`${styles.menuicon} ${styles.holidayicon}`}></span>
            <span>HOLIDAYS</span>
          </a>
        </li>
        <li>
          <a href="https://www.easemytrip.com/cabs/">
            <span className={`${styles.menuicon} ${styles.cabsicon}`}></span>
            <span>CABS</span>
          </a>
        </li>
        <li>
          <a href="https://www.easemytrip.com/visa-booking/">
            <span className={`${styles.menuicon} ${styles.visaicon}`}></span>
            <span>VISA</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
