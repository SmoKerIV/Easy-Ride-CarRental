"use client";
import Container from "@/Components/Container/Container";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Hero from "@/Components/Hero/page";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/apiconfig/endpoint";
import Services from "@/Components/Services/page";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      let url=BASE_URL
      const response = await fetch(`${url}/cars`);
      const data = await response.json();
      setCars(data);
    };

    fetchCars();
  }, []);

  return (
    <>
      <Header />
      <Container width={1200}>
        <Hero />
        <Services/>
      </Container>
    </>
  );
};

export default Home;
