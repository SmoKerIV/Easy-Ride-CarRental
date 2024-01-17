import Link from "next/link";
import Image from "next/image";
import Container from "./Components/Container/Container";
import styles from "./page.module.css";
import Header from "./Components/Header/Header";


const Home = () => {
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
    <>
      <Header />
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
            />
          </div>
          <div className={styles.btm}>
            <button>
              <Link href="/Vehicles">Browse Vehicles </Link>
            </button>
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
                    width={400}
                    height={400}
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
        <div className={styles.about}>

        </div>
      </Container>
    </>
  );
};

export default Home;
