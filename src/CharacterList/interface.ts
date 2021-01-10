import { Maybe } from "graphql/jsutils/Maybe";
import { SearchCharactersQueryCharacter } from "../core/interface";
import { Character } from "../graphql";

export interface CharacterCardProps {
  character: Maybe<SearchCharactersQueryCharacter>;
  onCardClick?: (id: Character) => void;
  onCardExcludeClick?: (id: Character) => void;
  slotName?: string;
}
