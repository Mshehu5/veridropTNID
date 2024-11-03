import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../mutations/createUserMutation";

export const useTnid = () => {
    const [createUser] = useMutation(CREATE_USER);

    const createTnidUser = async (userDetails: any) => {
        try {
            const input = {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
                uid: userDetails.uid, // Add any other required fields
            };
            await createUser({ variables: { input } });
            console.log("User created on TNID successfully");
        } catch (error) {
            console.error("Error creating user on TNID:", error);
        }
    };

    return { createTnidUser };
};
