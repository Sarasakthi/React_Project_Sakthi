import { getAuth } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, onSnapshot, updateDoc, doc } from 'firebase/firestore';
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
            //console.log(dbRefAddBeneficiary);
            alert(beneficiaryName + " added to your database.")
        }

        catch (error) {
            console.error(error);
        };
    };

//Adding Transaction Details To DB
export const addTransactionToDB =
    async (
        transAmount,
        transDate,
        transFreq,
        transFrom,
        transRecEndDate,
        transRecInterval,
        transRecStartDate,
        transRemarks,
        transTo,
        transUsername
    ) => {

        try {
            await addDoc(dbRefTransaction,
                {
                    transAmount: transAmount,
                    transDate: transDate,
                    transFreq: transFreq,
                    transFrom: transFrom,
                    transRecEndDate: transRecEndDate,
                    transRecInterval: transRecInterval,
                    transRecStartDate: transRecStartDate,
                    transRemarks: transRemarks,
                    transTo: transTo,
                    transUsername: transUsername
                });
            //console.log(dbRefTransaction);
        }

        catch (error) {
            console.error(error);
        };
    };

//Adding Transaction Details for Current User To DB
export const updateTransactionCurrentUser =
    async (
        whatFieldToUpdate,
        enterNewUpdateVal,
        userAccountTableName,
        senderDocID
    ) => {

        try {
            //Update Current User Amount
            const updateDocInput = doc(db, userAccountTableName, senderDocID)
            await updateDoc(updateDocInput,

                (whatFieldToUpdate == "Checking") ?
                    { amountChecking: enterNewUpdateVal }
                    :
                    (whatFieldToUpdate == "Savings") ?
                        { amountSavings: enterNewUpdateVal }
                        :
                        { amountTFS: enterNewUpdateVal }

            );
        }

        catch (error) {
            console.error(error);
        };
    };

//Adding Transaction Details for Current User To DB
export const updateTransactionBeneficiary =
    async (
        newUpdateAccountBalance,
        userAccountTableName,
        beneficiaryDocID
    ) => {

        try {
            //Update Beneficiary User Account Table
            const updateBeneficiaryDocInput = doc(db, userAccountTableName, beneficiaryDocID)
            await updateDoc(updateBeneficiaryDocInput,
                { amountChecking: newUpdateAccountBalance }
            );
        }

        catch (error) {
            console.error(error);
        };
    };