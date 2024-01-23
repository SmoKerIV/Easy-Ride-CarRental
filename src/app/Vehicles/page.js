'use client';
import { Card, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { BRAND_URL } from '@/apiconfig/endpoint';

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
        console.error('Error fetching brand data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (brandId) => {
    router.push(`/Vehicles/${brandId}`);
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]} justify="space-around">
      {brands.map((brand) => (
        <Col key={brand.brandId} sm={12} md={8} lg={6}>
          <Card
            hoverable
            style={{ width: '100%', height: '300px', backgroundColor: '#1f1f1f', borderColor: '#6e6e6e' }}
            cover={<img alt={brand.name} src={brand.image} style={{ height: '200px',width: '100%', objectFit: 'cover' }} />}
            onClick={() => handleCardClick(brand.brandId)}
          >
            <Meta title={brand.name} style={{ color: 'white' ,textAlign: 'center'}} />
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  );
}

export default BrandPage;
