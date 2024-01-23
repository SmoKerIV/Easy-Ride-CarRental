"use client";

// BrandCard.js
import React from "react";
import { useRouter } from "next/navigation";

const BrandCard = ({ brand }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/Vehicles/${brand.id}`);
  };

  return (
    <div onClick={handleCardClick}>
      <img src={brand.image} alt={brand.name} />
      <p>{brand.name}</p>
    </div>
  );
};

export default BrandCard;
