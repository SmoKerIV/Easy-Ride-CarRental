'use client';
// VehiclesPage.js
import React, { useState, useEffect } from "react";
import { BRAND_URL } from "@/apiconfig/endpoint";
import BrandCard from "@/Components/Brands/brandCards";
import VehicleList from "@/Components/Vehicles/vehicleList";

const VehiclesPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BRAND_URL);
        const data = await response.json();
        setBrands(data.brands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Fetch the list of brands
   fetchData(); // Update the state with the fetched brands
  }, []);

  return (
    <div>
      <h1>Explore Vehicles</h1>
      {/* Search bar and filters go here */}
      <div>
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
      {/* Render the VehicleList component */}
      <VehicleList />
    </div>
  );
};

export default VehiclesPage;
