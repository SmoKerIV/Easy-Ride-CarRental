import styles from "./Footer.module.css"
function Footer() {
  return (
    <div className={styles.footer}>
      <div className="frame">
        <img className="img" alt="Frame" src="frame-636.svg" />
        <img className="rentcar" alt="Rentcar" src="rentcar.svg" />
        <div className="text-wrapper">Rent Cars Company</div>
      </div>
    </div>
  );
}

export default Footer

    //   <p>© 2023 EasyRide. All rights reserved.</p>
    //   <p>Terms of Use | Privacy Policy</p>