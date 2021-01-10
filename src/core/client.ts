import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { Maybe, SearchCharactersQuery, Character } from "../graphql";

const { REACT_APP_GQL_API_URL } = process.env;

export const client = new ApolloClient({
  uri: REACT_APP_GQL_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: false,
            /** Describe Apollo Client merge policies for pagination querying */
            merge(existing, incoming, { variables }) {
              if (!incoming.results.length) {
                return incoming;
              }

              if (variables?.page === 1) {
                return incoming; 
              }

              const newResults = [
                ...(existing?.results ? existing?.results : []),
                ...(incoming?.results ? incoming?.results : []),
              ];

              const newResponse = {
                ...existing,
                ...incoming,
                results: newResults,
              };

              return newResponse;
            },
          },
        },
      },
    },
  }),
});

/** Introduce a number or Apollo reactive variables for in-app state management */

export const maxPage = makeVar<number>(1);
export const searchedCharacters = makeVar<SearchCharactersQuery | null>(null);
export const pickedRickSlot = makeVar<Maybe<Pick<Character, 'id' | 'name' | 'image'>>>(null);
export const pickedMortySlot = makeVar<Maybe<Pick<Character, 'id' | 'name' | 'image'>>>(null);
export const excludedCharacterIds = makeVar<Character["id"][]>([]);

export const addExcludedCharacterId = ({ id }: Character) => {
  const prev = excludedCharacterIds();

  excludedCharacterIds([...prev, id])
}