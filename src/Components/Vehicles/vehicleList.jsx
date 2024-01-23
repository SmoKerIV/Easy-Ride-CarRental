// VehicleList.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BrandCard from "@/Components/Brands/brandCards";
import { BRAND_URL } from "@/apiconfig/endpoint";

const VehicleList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BRAND_URL); // Assuming you have an endpoint for fetching brands
        const data = await response.json();
        setBrands(data.brands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Available Brands</h2>
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand.name} />
      ))}
    </div>
  );
};

export default VehicleList;
