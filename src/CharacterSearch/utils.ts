import { ApolloClient, gql } from "@apollo/client";

export const characterCacheQuery = gql`
  query searchCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
      }
      results {
        id
        name
        image
      }
    }
  }
`;

/** 
 * Sometimes we need to manually reset characterSearchField Query's Cache,
 * so i've written a custom cache changing function for that exact purpose
 */
export const eraseCharacterSearchFieldQueryCache = (
  client: ApolloClient<any>
) => {
  const data = client.readQuery({
    query: characterCacheQuery,
  });

  client.writeQuery({
    query: characterCacheQuery,
    data: {
      characters: {
        __typename: data?.characters?.__typename,
        info: {
          __typename: data?.characters?.info?.__typename,
          count: 0,
        },
        results: [],
      },
    },
  });
};
