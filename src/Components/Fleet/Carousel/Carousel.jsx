// Carousel.js
import Image from "next/image";
import styles from "./Carousel.module.css";

const Carousel = ({ cars }) => {
  if (!Array.isArray(cars) || cars.length === 0) {
    return <p className={styles.noCars}>No cars available</p>;
  }

  return (
    <div className={styles.carousel}>
      {cars.map((car) => (
        <div key={car.id} className={styles.carouselCard}>
          <Image
            className={styles.carImage}
            src={car.image1}
            alt={car.name}
            width={400}
            height={400}
          />
          <h3 className={styles.carName}>{car.name}</h3>
          <p className={styles.seats}>Seats: {car.seats}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
