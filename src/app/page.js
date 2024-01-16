// Home.js
import Image from "next/image";
import Container from "./Components/Container/Container";
import styles from "./page.module.css";

const Home = () => {
  const servicesData = [
    {
      title: "Service 1",
      description: "Description for Service 1",
      imageUrl: "/service1.jpg", 
    },
    {
      title: "Service 2",
      description: "Description for Service 2",
      imageUrl: "/service2.jpg",
    },
    {
      title: "Service 3",
      description: "Description for Service 3",
      imageUrl: "/service3.jpg",
    },
    {
      title: "Service 4",
      description: "Description for Service 4",
      imageUrl: "/service4.jpg",
    },
  ];
  return (
    <Container width={1200}>
      <div className={styles.hero}>
        <div className={styles.blue}></div>
        <div className={styles.herocontent}>
          <h1 className={styles.herotitle}>
            Car Rental
            <br /> For Every
            <br /> Occasion
          </h1>
          <p className={styles.herodescription}>
            <b>
              Easy<span>Ride</span>
            </b>{" "}
            Car Rental is an online car rental service that provides a wide
            selection of cars for rental at an affordable price.
          </p>
        </div>
        <div className={styles.car}>
          <Image
            src="https://cdn.discordapp.com/attachments/1055011807309353013/1196829279229575188/ss.png?ex=65b90d20&is=65a69820&hm=9a8b18004cbe994eede311148ebcc5b91aeaa33954d727800962704f2e6f00a4&"
            alt="car"
            width={800}
            height={800}
          ></Image>
        </div>
        <div className={styles.btm}>
          <button href="/Vehicles">Borwse Vehicles</button>
        </div>
      </div>
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
                  width={200}
                  height={200}
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
    </Container>
  );
};

export default Home;
