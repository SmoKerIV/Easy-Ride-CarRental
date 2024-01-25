import { Image } from "@nextui-org/react";
import styles from "./service.module.css";
import { Link } from "@nextui-org/react";
function Services() {
  const servicesData = [
    {
      title: "Long-Distance Rental",
      description: "lorem ipsum dolor sit amet ",
      imageUrl: "https://www.pngall.com/wp-content/uploads/8/White-SUV-PNG.png",
    },
    {
      title: "Airport Transfers Rental",
      description: "lorem ipsum dolor sit amet",
      imageUrl: "https://www.pngall.com/wp-content/uploads/8/White-SUV-PNG.png",
    },
    {
      title: "Business Meeting Rental",
      description: "lorem ipsum dolor sit amet",
      imageUrl: "https://www.pngall.com/wp-content/uploads/8/White-SUV-PNG.png",
    },
    {
      title: "Wedding Events Rental",
      description: "lorem ipsum dolor sit amet",
      imageUrl: "https://www.pngall.com/wp-content/uploads/8/White-SUV-PNG.png",
    },
  ];
  return (
    <div className={styles.services}>
      <div className={styles.servicestitle}>
        <h1>Services</h1>
      </div>
      <div className={styles.serviceContainer}>
        {servicesData.map((service, i) => (
          <div key={i} className={styles.serviceCard}>
            <div className={styles.serviceImage}>
              <Image
                src={service.imageUrl}
                alt={service.title}
                
              />
            </div>
            <div className={styles.serviceContent}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
