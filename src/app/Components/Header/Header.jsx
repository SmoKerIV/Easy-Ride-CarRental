import Link from "next/link";
import styles from "./Header.module.css";
import { Button } from "@nextui-org/react";
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.logo}>
          Easy<span>Ride</span>
        </h1>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/Vehicles">Vehicles</Link>
          </li>
          <li>
            <Link href="/About Us">About Us</Link>
          </li>
        </ul>
        <Button color="primary">Sign in</Button>
      </div>
    </div>
  );
};

export default Header;
