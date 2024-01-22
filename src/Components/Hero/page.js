import Image from "next/image";
import styles from "./hero.module.css";
import Link from "next/link";

function Hero() {
  return (
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
  );
}

export default Hero;
