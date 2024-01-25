"use client";
import { Card, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND_URL } from "@/apiconfig/endpoint";
import { Image } from "@nextui-org/react";
const { Meta } = Card;

function BrandPage() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BRAND_URL);
        const data = await response.json();
        setBrands(data.brands);
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (brandId) => {
    router.push(`/Vehicles/${brandId}`);
  };

  return (
    <div className="container mx-auto p-8 flex items-center justify-center">
      <Row gutter={[6, 6]} justify="center">
        {brands.map((brand) => (
          <Col key={brand.brandId} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="relative w-full h-full p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center"
              style={{
                backgroundColor: "#1f1f1f",
                borderColor: "#6e6e6e",
              }}
              cover={
                <Image
                  className="w-full h-full object-cover rounded-lg"
                  alt={brand.name}
                  src={brand.image}
                />
              }
              onClick={() => handleCardClick(brand.brandId)}
            ></Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BrandPage;
