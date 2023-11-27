import { getAuth } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
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
                    username: currentUID().email,
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

//Fetching Account Balances from Database
export async function AccountListDB_Old() {
    const [accountList, setAccountList] = useState("");

    console.log("Reached FunctionDBQueryList")

    let username = currentUID().email

    const resultData = query(collection(db, dbRefAccount), where("username", "==", username));

    const querySnapshot = await getDocs(resultData);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    })
    return querySnapshot
}


//Fetching Account Balances from Database
export const accountListDBCopy =
    async (username) => {
        try {
            const resultData = query(dbRefAccount, where("username", "==", username));
            const querySnapshot = await getDocs(resultData);
            const returnData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            console.log(returnData)
            /*querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                return doc.data()
            });*/
        }

        catch (error) {
            console.error(error);
        };
    }

//Fetching Account Balances from Database
export function accountListDBFunction(username) {
    const accountListDB =
        async (username) => {
            try {
                const resultData = query(dbRefAccount, where("username", "==", username));
                const querySnapshot = await getDocs(resultData);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    return doc.data()
                });
            }

            catch (error) {
                console.error(error);
            };
        }
}