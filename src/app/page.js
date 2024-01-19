"use client";
import Container from "@/Components/Container/Container";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Hero from "@/Components/Hero/hero";
import Services from "@/Components/Services/services";
import Fleet from "@/Components/Fleet/Fleet";

const Home = () => {

  return (
    <>
      <Header />
      <Container width={1200}>
        <Hero />
        <Services/>
        <Fleet />
      </Container>
    </>
  );
};

export default Home;
