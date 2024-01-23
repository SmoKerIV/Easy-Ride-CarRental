'use client';
import { useState } from "react";
import styles from "./Carousel.module.css";

const Carousel = ({ cars }) => {
  const [current, setCurrent] = useState(0);
  const length = 10;

  if (!Array.isArray(cars) || cars.length === 0) {
    return <p className={styles.noCars}>No cars available</p>;
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className={styles.carousel}>
      <button onClick={prevSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          color="#0080b4"
        >
          <g transform="translate(24 0) scale(-1 1)">
            <path
              fill="currentColor"
              d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
            />
          </g>
        </svg>
      </button>
      {cars.slice(current, current + 3).map((car) => (
        <div key={car.id} className={styles.carouselCard}>
          <div className={styles.imageContainer}>
            <img className={styles.carImage} src={car.image1} alt={car.name} />
          </div>
          <h3 className={styles.carName}>{car.name}</h3>
          <p className={styles.seats}>Seats: {car.seats}</p>
        </div>
      ))}
      <button onClick={nextSlide}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          color="#0080b4"
        >
          <path
            fill="currentColor"
            d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
          />
        </svg>{" "}
      </button>
    </div>
  );
};

export default Carousel;
