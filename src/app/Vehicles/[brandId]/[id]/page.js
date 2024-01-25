"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { Image, Button } from "@nextui-org/react";

function CarPage({ params }) {
  const carId = params.id;
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const response = await fetch(`/api/cars/${carId}`);
        const data = await response.json();
        setCar(data.car);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setCar(null);
      }
    };

    if (carId) {
      fetchCarById();
    }
  }, [carId]);

  return (
    <div className="max-w-7xl mx-auto">
      <Carousel autoplay effect="fade">
        {car && car.image1 && (
          <div className="relative">
            <div className="flex items-center justify-center bg-cover h-650">
              <Image className="w-full h-auto" src={car.image1} />
            </div>
          </div>
        )}
        {car && car.image2 && (
          <div className="relative">
            <div className="flex items-center justify-center bg-cover h-650">
              <Image className="w-full h-auto" src={car.image2} />
            </div>
          </div>
        )}
        {car && car.image3 && (
          <div className="relative">
            <div className="flex items-center justify-center bg-cover h-650">
              <Image className="w-full h-auto" src={car.image3} />
            </div>
          </div>
        )}
        {car && car.image4 && (
          <div className="relative">
            <div className="flex items-center justify-center bg-cover h-650">
              <Image className="w-full h-auto" src={car.image4} />
            </div>
          </div>
        )}
      </Carousel>

      {car ? (
        <>
          <div className="p-12 items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p>
                  <strong>Model:</strong> {car.model}
                </p>
                <p>
                  <strong>Year:</strong> {car.year}
                </p>
                <p>
                  <strong>Seats:</strong> {car.seats}
                </p>
                <p>
                  <strong>Fuel Type:</strong> {car.fuel_type}
                </p>
                <p>
                  <strong>Mileage:</strong> {car.mileage} miles
                </p>
                <p>
                  <strong>Condition:</strong> {car.condition}
                </p>
              </div>
              <div>
                <p>
                  <strong>Tank Capacity:</strong> {car.tank} gallons
                </p>
                <p>
                  <strong>Availability:</strong>{" "}
                  {car.available ? "Available" : "Not Available"}
                </p>
                <p>
                  <strong>Plate Number:</strong> {car.plateNumber}
                </p>
                <p>
                  <strong>Book For A Day:</strong> ${car.priceDay}
                </p>
                <p>
                  <strong>Book For A Week:</strong> ${car.priceWeek || "N/A"}
                </p>
                <p>
                  <strong>Book For A Month:</strong> ${car.priceMonth || "N/A"}
                </p>
              </div>
            </div>

            <Button
              style={{ backgroundColor: "#0080B4", borderRadius: "8px" }}
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 text-lg cursor-pointer transition duration-200 items-center justify-center"
              variant="contained"
              color="primary"
            >
              Book Now
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CarPage;
