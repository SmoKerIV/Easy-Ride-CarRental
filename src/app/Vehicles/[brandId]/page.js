"use client";
import { Card, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND_URL } from "@/apiconfig/endpoint";
import { Image } from "@nextui-org/react";

const { Meta } = Card;

function Page({ params }) {
  const brandId = params.brandId;
  const router = useRouter();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCarsByBrand = async () => {
      try {
        const response = await fetch(`${BRAND_URL}/${brandId}`);
        const data = await response.json();
        setCars(data.cars || []);
      } catch (error) {
        console.error("Error fetching cars data:", error);
        setCars([]);
      }
    };

    fetchCarsByBrand();
  }, [brandId]);

  const handleCardClick = (id) => {
    router.push(`/Vehicles/${brandId}/${id}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <Row gutter={[16, 16]} justify="space-around">
        {cars.map((car) => (
          <Col key={car.id} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#1f1f1f",
                borderColor: "#6e6e6e",
                padding: "10px",
              }}
              cover={
                <div style={{ height: "250px", overflow: "hidden" }}>
                  <Image
                    className="w-full h-full object-cover"
                    alt={car.name}
                    src={car.image1}
                  />
                </div>
              }
              onClick={() => handleCardClick(car.id)}
            >
              <h1 className="text-white text-xl font-bold">{car.name}</h1>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Page;
