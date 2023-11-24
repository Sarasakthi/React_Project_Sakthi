import { getAuth } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "./firebase";

export const currentUID = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        return user
    }
    else {
        return null
    }
}

//Adding addBeneficiary To DB
const userBeneficiaryRef = collection(db, "userBeneficiary");
export const addBeneficiaryToDB =
    async (
        beneficiaryName,
        beneficiaryEmail,
        beneficiaryRemarks) => {

        console.log("I am entered addSignupToDB")

        try {
            await addDoc(userBeneficiaryRef,
                {
                    username: currentUID().email,
                    beneficiaryName: beneficiaryName,
                    beneficiaryEmail: beneficiaryEmail,
                    beneficiaryRemarks: beneficiaryRemarks
                });
            console.log("I am exited Try addSignupToDB");
            console.log(userBeneficiaryRef);
        }

        catch (error) {
            console.error(error);
            console.log("I am inside Catch addSignupToDB");
        };

        console.log("I am exited Try and Catch addSignupToDB")
    }