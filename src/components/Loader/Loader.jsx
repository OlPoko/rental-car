import styles from "./Loader.module.css";

const Loader = ({ small = false }) => {
  return <div className={small ? styles.loaderSmall : styles.loader}></div>;
};

export default Loader;
