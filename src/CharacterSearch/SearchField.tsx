import { Loader } from "../Loader";
import { SearchFieldProps } from "./interfaces";
import styles from "./styles.module.css";

/**
 * Controlled Searchfield component
 * View layer: Represents only UI element, no Data logic
 * */
export const SearchField: React.FC<SearchFieldProps> = ({
  onChange,
  value,
  loading,
  ...rest
}) => {
  return (
    <div className={styles.SearchFieldContainer}>
      <input
        value={value}
        className={styles.SearchField}
        onChange={onChange}
        {...rest}
      />
      <Loader show={loading} />
    </div>
  );
};
