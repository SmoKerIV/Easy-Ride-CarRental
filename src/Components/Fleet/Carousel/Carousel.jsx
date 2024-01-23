// Carousel.js
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

const Carousel = ({ cars }) => {
  const [displayedCars, setDisplayedCars] = useState(1); // Initial number of displayed cars

  useEffect(() => {
    // Update the number of displayed cars based on screen width
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDisplayedCars(1);
      } else {
        setDisplayedCars(3);
      }
    };

    // Set the initial number of displayed cars
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + displayedCars) % cars.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - displayedCars + cars.length) % cars.length);
  };

  return (
    <div className={styles.carousel}>
      <button onClick={prevSlide}>{/* Previous button SVG */}</button>
      {cars.slice(current, current + displayedCars).map((car) => (
        <div key={car.id} className={styles.carouselCard}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.carImage}
              src={car.image1}
              alt={car.name}
              width={300}
              height={300}
            />
          </div>
          <h3 className={styles.carName}>{car.name}</h3>
          <p className={styles.seats}>Seats: {car.seats}</p>
        </div>
      ))}
      <button onClick={nextSlide}>{/* Next button SVG */}</button>
    </div>
  );
};

export default Carousel;
