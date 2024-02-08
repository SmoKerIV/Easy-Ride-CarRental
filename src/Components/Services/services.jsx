import { Image } from "@nextui-org/react";
import styles from "./service.module.css";
import { Link } from "@nextui-org/react";

function Services() {
  const servicesData = [
    {
      title: "Long-Distance Rental",
      description:
        "Explore new horizons with our long-distance rental services. Whether it's a road trip or a weekend getaway, we've got you covered.",
      imageUrl:
        "https://cdn.discordapp.com/attachments/1052301242833051770/1197944819520110674/pngwing.com_2.png?ex=65bd1c0d&is=65aaa70d&hm=0490a71ef24ec15c7cf0c8711d5d00510ea1d1d8aac10a15803cabf4616317da&",
    },
    {
      title: "Airport Transfers Rental",
      description:
        "Enjoy a hassle-free journey with our airport transfer rental services. Your comfort and convenience are our top priorities.",
      imageUrl:
        "https://cdn.discordapp.com/attachments/1052301242833051770/1197953858173939872/pngwing.com_2.png?ex=65bd2478&is=65aaaf78&hm=7ac273645215d8962a10b565e3d6beaad8ba4b1f888decaa38f536b27a6a4a37&",
    },
    {
      title: "Business Meeting Rental",
      description:
        "Make a lasting impression with our business meeting rental services. Arrive in style and leave a professional impact on your clients.",
      imageUrl:
        "https://cdn.discordapp.com/attachments/1052301242833051770/1197963005602832435/pngwing.com_1.png?ex=65bd2cfd&is=65aab7fd&hm=a637b1f5f7e75b4f532e1ec15cab77646f063193aaab8ec0a9500eebc102bd93&",
    },
    {
      title: "Wedding Events Rental",
      description:
        "Create beautiful memories with our wedding events rental services. Let us add a touch of elegance to your special day.",
      imageUrl:
        "https://cdn.discordapp.com/attachments/1062470602595782750/1197959114890956830/pngwing.com_1.png?ex=65bd295d&is=65aab45d&hm=11b0d6936c53140d94525d504d9b9f55dd797ada1e2c1263e548834e25bc563f&",
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
              <Image src={service.imageUrl} alt={service.title} />
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
