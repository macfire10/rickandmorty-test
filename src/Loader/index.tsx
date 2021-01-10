import styles from "./styles.module.css";
import { LoaderProps } from "./interface";

export const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className={styles.LdsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
