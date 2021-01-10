import { useReactiveVar } from "@apollo/client";
import {
  addExcludedCharacterId,
  excludedCharacterIds,
  maxPage,
  pickedMortySlot,
  pickedRickSlot,
  searchedCharacters,
} from "../core/client";
import { Character } from "../graphql";
import { CharacterCard } from "./CharacterCard";
import styles from "./styles.module.css";
import { matchRick, matchMorty } from "./utils";

/**
 */
export const CharacterList: React.FC = () => {
  const page = useReactiveVar(maxPage);
  const excludedCharacters = useReactiveVar(excludedCharacterIds);
  const characterData = useReactiveVar(searchedCharacters);

  /** Hide Fetch More button if we've fetched all of available characters */
  const showFetchMore =
    characterData?.characters?.info?.count !==
    characterData?.characters?.results?.length;

  const onCardClick = (character: Character) => {
    const { name } = character;

    if (matchRick(name)) {
      pickedRickSlot(character);
    }
    if (matchMorty(name)) {
      pickedMortySlot(character);
    }
  };

  return (
    <>
      <div className={styles.CharacterList}>
        {characterData?.characters?.results?.map((character) => {
          if (excludedCharacters.includes(character?.id)) return null;
          if (!character) return null;

          return (
            <CharacterCard
              key={character.id}
              character={character}
              onCardClick={onCardClick}
              onCardExcludeClick={addExcludedCharacterId}
            />
          );
        })}
      </div>
      {showFetchMore && (
        <button
          className={styles.FetchMoreButton}
          onClick={() => maxPage(page + 1)}
        >
          fetch more!
        </button>
      )}
    </>
  );
};
