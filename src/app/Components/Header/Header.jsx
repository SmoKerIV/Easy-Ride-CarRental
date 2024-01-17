import Link from "next/link";
import styles from "./Header.module.css";
import Container from "../Container/Container";
const Header = () => {
  return (
    <Container width={1400}>
      <div className={styles.header}>
        <div className={styles.content}>
          <h1 className={styles.logo}>
            <Link href="/">
              {" "}
              Easy<span>Ride</span>
            </Link>
          </h1>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/Vehicles">Vehicles</Link>
            </li>
            <li>
              <Link href="/About">About Us</Link>
            </li>
          </ul>
          <button>
            <Link href="/Sign">Sign in</Link>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Header;
