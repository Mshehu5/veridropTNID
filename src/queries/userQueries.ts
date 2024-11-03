// src/queries/userQueries.js
import { gql } from "@apollo/client";

export const SEARCH_USER = gql`
    query SearchUser(
        $name: String
        $email: String
        $telephoneNumber: String
        $limit: Int
    ) {
        users(
            name: $name
            email: $email
            telephoneNumber: $telephoneNumber
            limit: $limit
        ) {
            id
            firstName
            lastName
            username
        }
    }
`;
