import { ApolloProvider } from "@apollo/client";
import { Layout } from "../Layout";
import { client } from "./client";

/** 
 * First level export,
 * contains context providers, wrappers.
 * 
 * Does not contain any UI elements.
 */
function App() {
  return (
    <ApolloProvider client={client}>
      <Layout />
    </ApolloProvider>
  );
}

export default App;
