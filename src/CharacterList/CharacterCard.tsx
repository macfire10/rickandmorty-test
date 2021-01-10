import { CharacterCardProps } from "./interface";
import styles from "./styles.module.css";

import { ReactComponent as CrossIcon } from "./cross.svg";

/**
 */
export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onCardClick,
  onCardExcludeClick,
  slotName,
}) => {
  const image = character?.image;

  const onCardClickHandler = () => {
    onCardClick && character && onCardClick(character);
  };

  const onCardExcludeClickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    onCardExcludeClick && character && onCardExcludeClick(character);
  };

  return (
    <div
      className={styles.CharacterCard}
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={onCardClickHandler}
    >
      {onCardExcludeClick && character && (
        <button
          className={styles.CharacterExcludeButton}
          onClick={onCardExcludeClickHandler}
        >
          <CrossIcon />
        </button>
      )}
      {slotName && !character && <div className={styles.SlotName}>{slotName}</div>}
    </div>
  );
};
