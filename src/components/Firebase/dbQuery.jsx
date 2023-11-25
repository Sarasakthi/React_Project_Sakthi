import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from "./firebase";
import { useState } from "react";

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

/* --------------------- */
/* Working with Firebase */
/* --------------------- */

//DB Reference and Table name
const dbRefAddBeneficiary = collection(db, "userBeneficiary");
const dbRefAccount = collection(db, "userAccount");
const dbRefTransaction = collection(db, "userTransaction");

//Adding addBeneficiary To DB
export const addBeneficiaryToDB =
    async (
        beneficiaryName,
        beneficiaryEmail,
        beneficiaryRemarks) => {

        console.log("I am entered addSignupToDB")

        try {
            await addDoc(dbRefAddBeneficiary,
                {
                    //username: currentUID().email,
                    beneficiaryName: beneficiaryName,
                    beneficiaryEmail: beneficiaryEmail,
                    beneficiaryRemarks: beneficiaryRemarks
                });
            console.log("I am exited Try addSignupToDB");
            console.log(dbRefAddBeneficiary);
        }

        catch (error) {
            console.error(error);
            console.log("I am inside Catch addSignupToDB");
        };

        console.log("I am exited Try and Catch addSignupToDB")
    };

//Fetching Account Balances from Database
export function FunctionDBQueryList() {
    const [accountList, setAccountList] = useState("");

    console.log("Reached FunctionDBQueryList")

    const fetchAccountBalanceFromDB = async () => {
        try {
            let username = currentUID().email
            const data = await getDocs(dbRefAccount);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            console.log("Printing")
            console.log(setAccountList(filterData))
            console.log("Printed")
            return setAccountList(filterData)
        }
        catch (err) {
            console.error(err);
        }
    }
};