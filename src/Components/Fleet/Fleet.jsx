// Fleet.jsx
'use client'
import { useState, useEffect } from "react";
import Carousel from "./Carousel/Carousel";
import { CARS_URL } from "@/apiconfig/endpoint";
import styles from "./Fleet.module.css";

const Fleet = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CARS_URL);
        const data = await response.json();
        setCars(data.cars);
        setFilteredCars(data.cars); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (category) => {
    if (Array.isArray(cars)) {
      const filtered = cars.filter(
        (cars) => cars.category === category
      );
      setFilteredCars(filtered);
    }
  };

  return (
    <div className={styles.fleet}>
    <div className={styles.fleetContainer}>
      <h1>View Our Fleet</h1>
      <p>hi</p>
      <div className={styles.filterButtons}>
        <button onClick={() => handleFilter("SUV")}>SUV</button>
        <button onClick={() => handleFilter("SEDAN")}>Sedan</button>
        <button onClick={() => handleFilter("SPORT")}>Sport</button>
        <button onClick={() => handleFilter("PICKUP")}>Pickup</button>
        <button onClick={() => handleFilter("COUPE")}>Coupe</button>
        <button onClick={() => setFilteredCars(cars)}>ALL</button>
      </div>
      <div className={styles.carCards}>
        <Carousel cars={filteredCars} />
      </div>
    </div>
  </div>
  );
};

export default Fleet;
