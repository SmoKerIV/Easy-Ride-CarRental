"use client";
import { Card, Row, Col, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND_URL, CARS_URL } from "@/apiconfig/endpoint";
import { Image } from "@nextui-org/react";
const { Meta } = Card;
const { Search } = Input;

function BrandPage() {
  const router = useRouter();
  const [brands, setBrands] = useState(Array.from({ length: 10 }));
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BRAND_URL);
        const data = await response.json();
        setBrands(data.brands);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brand data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handlebrandCardClick = (brandId) => {
    router.push(`/Vehicles/${brandId}`);
  };

  const handleCardClick = (brandId, carId) => {
    router.push(`/Vehicles/${brandId}/${carId}`);
  };

  const handleCardHover = (brandId) => {
    setHoveredCard(brandId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);

    // Implement your search logic here
    const results = filterCarsByName(value);
    setSearchResults(results);
  };

  const filterCarsByName = (query) => {
    // Assuming you want to filter by car name
    return cars.filter((car) =>
      car.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleShowCars = () => {
    setShowCars(true);
    setSearchResults(filteredCars);
  };

  const handleShowBrands = () => {
    setShowCars(false);
    setSearchResults([]);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <Search
        placeholder="Search for cars"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 300, marginTop: 20, marginBottom: 10, padding: 10 }}
      />

      {/* Buttons to switch between Cars and Brands */}
      <div style={{ marginBottom: 10 }}>
        <Button className="mx-3" type={"primary"} onClick={handleShowCars}>
          Cars
        </Button>
        <Button type={"primary"} onClick={handleShowBrands}>
          Brands
        </Button>
      </div>

      {loading ? (
        // Loading skeleton
        <Row
          justify="center"
          style={{ margin: "5px 0px", height: "100%", width: "100%" }}
        >
          {brands.map((_, index) => (
            <Col
              key={index}
              sm={12}
              md={8}
              lg={6}
              style={{ margin: "5px 5px", height: "100%", width: "100%" }}
            >
              <div
                role="status"
                className="flex items-center justify-center h-56 w-90 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              ></div>
            </Col>
          ))}
        </Row>
      ) : (
        // Brand Cards or Search Results
        <Row gutter={[6, 6]} justify="center">
          {searchResults.length > 0
            ? searchResults.map((car) => (
                <Col key={car.id} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className={`relative w-full h-full p-4 rounded-lg shadow-lg transform transition-transform duration-300 flex flex-col justify-center items-center ${
                      hoveredCard === car.id ? "hover:scale-105" : ""
                    }`}
                    style={{
                      backgroundColor: "#1f1f1f",
                      borderColor: "#6e6e6e",
                      zIndex: hoveredCard === car.id ? 1 : 0,
                    }}
                    cover={
                      <Image
                        className="w-full h-full object-cover rounded-lg"
                        alt={car.name}
                        src={car.image1}
                      />
                    }
                    onClick={() => handleCardClick(car.brandId, car.id)}
                    onMouseEnter={() => handleCardHover(car.id)}
                    onMouseLeave={handleCardLeave}
                  >
                    <h1 className="text-white text-xl font-bold">{car.name}</h1>
                  </Card>
                </Col>
              ))
            : showCars
            ? cars.map((car) => (
                <Col key={car.id} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className={`relative w-full h-full p-4 rounded-lg shadow-lg transform transition-transform duration-300 flex flex-col justify-center items-center ${
                      hoveredCard === car.id ? "hover:scale-105" : ""
                    }`}
                    style={{
                      backgroundColor: "#1f1f1f",
                      borderColor: "#6e6e6e",
                      zIndex: hoveredCard === car.id ? 1 : 0,
                    }}
                    cover={
                      <Image
                        className="w-full h-full object-cover rounded-lg"
                        alt={car.name}
                        src={car.image1}
                      />
                    }
                    onClick={() => handleCardClick(car.brandId, car.id)}
                    onMouseEnter={() => handleCardHover(car.id)}
                    onMouseLeave={handleCardLeave}
                  >
                    <h1 className="text-white text-xl font-bold">{car.name}</h1>
                  </Card>
                </Col>
              ))
            : brands.map((brand) => (
                <Col key={brand.brandId} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className={`relative w-full h-full p-4 rounded-lg shadow-lg transform transition-transform duration-300 flex flex-col justify-center items-center ${
                      hoveredCard === brand.brandId ? "hover:scale-105" : ""
                    }`}
                    style={{
                      backgroundColor: "#1f1f1f",
                      borderColor: "#6e6e6e",
                      zIndex: hoveredCard === brand.brandId ? 1 : 0,
                    }}
                    cover={
                      <Image
                        className="w-full h-full object-cover rounded-lg"
                        alt={brand.name}
                        src={brand.image}
                      />
                    }
                    onClick={() => handlebrandCardClick(brand.brandId)}
                    onMouseEnter={() => handleCardHover(brand.brandId)}
                    onMouseLeave={handleCardLeave}
                  >
                    <h1 className="text-white text-xl font-bold">
                      {brand.name}
                    </h1>
                  </Card>
                </Col>
              ))}
        </Row>
      )}
    </div>
  );
}

export default BrandPage;
