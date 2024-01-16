import Container from './Components/Container/Container'
import Header from './Components/Header/Header';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Container>
        <Header />
        <div className={styles.hero}>
          <div className={styles.blue}></div>
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
      </Container>
    </>
  );
}
