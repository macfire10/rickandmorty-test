import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

import { useSearchCharactersLazyQuery } from "../graphql";
import {
  maxPage, searchedCharacters,
} from "../core/client";

import { SearchField } from "./SearchField";
import { useReactiveVar } from "@apollo/client";
import { eraseCharacterSearchFieldQueryCache } from "./utils";

/**
 * CharacterSearch component, utilises Apollo Client
 * fetching and state management capabilities.
 *
 * Data logic layer.
 */
export const CharacterSearch: React.FC = () => {
  const page = useReactiveVar(maxPage);
  const [characterName, setCharacterName] = useState('');

  const [
    loadCharactersLazyQuery,
    { loading, data, fetchMore, client },
  ] = useSearchCharactersLazyQuery({
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      if (client && error.message === "404: Not Found") {
        eraseCharacterSearchFieldQueryCache(client);
      }
    },
  });

  /**
   * debounce it so it triggers only once every 300ms
   *
   *
   * */
  const loadSearchCharacters = debounce((name: string) => {
    /** should not be called for name lengths less then 2 */
    if (name.length < 3) {
      client && eraseCharacterSearchFieldQueryCache(client);

      return;
    }

    loadCharactersLazyQuery({
      variables: {
        page: 1,
        filter: {
          name,
        },
      },
    });
  }, 300);

  useEffect(() => {
    searchedCharacters(data);
  }, [data]);

  useEffect(() => {
    if (page > 1 && fetchMore) {
      fetchMore({
        variables: {
          page,
          filter: {
            name: characterName,
          },
        },
      });
    }
  }, [page, characterName, fetchMore]);

  const onSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    maxPage(1);
    const name = event.target.value;

    /** set local state */
    setCharacterName(name);

    loadSearchCharacters(name);
  };

  return (
    <SearchField
      loading={loading}
      value={characterName}
      onChange={onSearchFieldChange}
      placeholder="Rick"
    />
  );
};
