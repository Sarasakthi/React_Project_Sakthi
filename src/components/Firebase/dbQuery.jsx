import { getAuth } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';
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

        try {
            await addDoc(dbRefAddBeneficiary,
                {
                    username: currentUID().email,
                    beneficiaryName: beneficiaryName,
                    beneficiaryEmail: beneficiaryEmail,
                    beneficiaryRemarks: beneficiaryRemarks
                });
            console.log(dbRefAddBeneficiary);
            alert(beneficiaryName + " added to your database.")
        }

        catch (error) {
            console.error(error);
        };
    };

//Fetching Account Balances from Database
/*export function FetchAccountBalanceFromDB() {
    const [accountList, setAccountList] = useState("");
    async () => {
        try {
            console.log("Reached FunctionDBQueryList")

            let username = currentUID().email

            //Fetching Account Balances from Database
            const queryData = query(dbRefAccount,
                where("username", "==", (username)));
            const returnData = onSnapshot(queryData, (querySnapshot) => {
                let letMyAccountList = []
                querySnapshot.forEach((doc) => {
                    letMyAccountList.push({ ...doc.data(), id: doc.id });
                    console.log(doc.id, " ==> ", doc.data());
                });
                setAccountList(letMyAccountList);
                console.log(accountList)
            });
            return () => returnData();
        }
        catch (err) {
            console.error(err);
        }
    }
};*/
