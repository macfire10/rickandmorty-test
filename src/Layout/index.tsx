import { CharacterList } from "../CharacterList";
import { CharacterSearch } from "../CharacterSearch";
import { Party } from '../Party';
import styles from "./styles.module.css";

/**
 * Layout component,
 * contains all core UI elements like character search field,
 * character list and party creator.
 */
export const Layout: React.FC = () => {
  return (
    <main className={styles.Layout}>
      <CharacterSearch />
      <CharacterList />
      <Party />
    </main>
  );
};
