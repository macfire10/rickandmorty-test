import { useReactiveVar } from "@apollo/client";
import { CharacterCard } from "../CharacterList/CharacterCard";
import { pickedMortySlot, pickedRickSlot } from "../core/client";
import styles from "./styles.module.css";

/**
 */
export const Party: React.FC = () => {
  const rickSlot = useReactiveVar(pickedRickSlot);
  const mortySlot = useReactiveVar(pickedMortySlot);

  const eraseRickSlot = () => pickedRickSlot(null);
  const eraseMortySlot = () => pickedMortySlot(null);

  return (
    <>
      <div className={styles.PartyHeader}>Party</div>
      <div className={styles.CharacterList}>
        <CharacterCard
          character={rickSlot}
          onCardExcludeClick={eraseRickSlot}
          slotName="Rick"
        />
        <CharacterCard
          character={mortySlot}
          onCardExcludeClick={eraseMortySlot}
          slotName="Morty"
        />
      </div>
    </>
  );
};
