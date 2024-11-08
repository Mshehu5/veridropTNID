// src/mutations/createUserMutation.js
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            user {
                id
                firstName
                lastName
                email
            }
        }
    }
`;
