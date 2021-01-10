import { Character } from "../graphql";

export type SearchCharactersQueryCharacter = {
  __typename?: "Character";
} & Pick<Character, "id" | "name" | "image">;
