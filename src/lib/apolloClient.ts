// src/lib/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://api.tnid.com/graphql", // Replace with TNID API URL
});

const authLink = setContext((_, { headers }) => {
    // Get the token from a secure source, e.g., local storage or environment variables
    // const token = localStorage.getItem("tnidAuthToken");
    return {
        headers: {
            ...headers,
            authorization:
                "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIiLCJjb21wYW55X2lkIjoiNTdhNWQyZjAtOWMwYS00ZjMyLTg0OWYtYjhkMDAwMThiNWFjIiwiZXhwIjoxNzMxMjU1MjkyLCJpYXQiOjE3MzA2NTA0OTIsImlzcyI6IiIsImp0aSI6IjY5ZGVkOTU5LWZkNTMtNGU5OS1iNTE4LTQwNDRmNjg4YTMwZSIsIm5iZiI6MTczMDY1MDQ5MSwic3ViIjoiQ29tcGFueUlkOjU3YTVkMmYwLTljMGEtNGYzMi04NDlmLWI4ZDAwMDE4YjVhYyIsInR5cCI6ImFjY2VzcyJ9.pEg6ysy1zcCFSG8Mx39BLfXOAuJjaKnXQI2ShfzynXM7sU8uh2FUTXUiEbyCpCL8KmGAGMqo6W7UYrfsSDtb8g",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
