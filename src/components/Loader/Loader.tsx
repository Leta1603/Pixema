import React from "react";
import Lottie from "lottie-react";
import animation from "src/assets/animation.json";

import styles from "./Loader.module.scss";
const Loader = () => {
  return (
    <div className={styles.lottie}>
      <Lottie animationData={animation} loop={true} />
    </div>
  );
};

export default Loader;
