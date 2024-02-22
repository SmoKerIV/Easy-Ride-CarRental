"use client";
import { useEffect, useState } from "react";
import {  Button } from "@nextui-org/react";
import styles from "./Header.module.css";
import Container from "../Container/Container";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    // Clear the token from local storage when signing out
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

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
          {isAuthenticated ? (
            <Button>
              <Link href="/myCars">My Cars</Link>
            </Button>
          ) : (
            <Button>
              <Link href="/Sign">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Header;
