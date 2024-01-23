"use client";
import Container from "@/Components/Container/Container";
import Hero from "@/Components/Hero/page";
import Services from "@/Components/Services/page";
import Fleet from "@/Components/Fleet/Fleet";

const Home = () => {

  return (
    <>
      <Container width={1200}>
        <Hero />
        <Services />
        <Fleet />
      </Container>
        </>
  );
};

export default Home;
