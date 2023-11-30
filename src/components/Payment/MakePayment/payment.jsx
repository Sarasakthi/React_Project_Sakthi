import React, { Component } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import NavBar from "../../Common/Navbar/navbar"
import Footer from "../../Common/Footer/footer"
import LogoutApplication from "../../Logout/autoLogout";
//import { FetchAccountBalanceFromDB } from "../../Firebase/dbQuery"
import * as CommonFunction from "../../Common/General/commonFunctions"

import "../../Home/styles_home.css"
import "./styles_payment.css"
import "../../Common/General/variables"
import "../../Common/General/styles_common.css"

/*Adding authentication check*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../Firebase/firebase";
import { collection, addDoc, query, where, getDocs, DocumentSnapshot, onSnapshot, QuerySnapshot } from 'firebase/firestore';

export default function Payment() {

    const navigate = useNavigate();

    //Const for DB
    const dbRefAccount = collection(db, "userAccount");
    const dbRefAddBeneficiary = collection(db, "userBeneficiary");
    const dbRefTransaction = collection(db, "userTransaction");
    const [accountList, setAccountList] = useState([]);
    const [beneficiaryList, setBeneficiaryList] = useState([]);
    const [loading, setLoading] = useState(true);

    //Input from the Payment page
    const [valuePaymentTransferFrom, setValuePaymentTransferFrom] = useState("Checking")
    const [valuePaymentTransferTo, setValuePaymentTransferTo] = useState("")
    const [valuePaymentTransferAmount, setValuePaymentTransferAmount] = useState("")
    const [valuePaymentTransferRemarks, setValuePaymentTransferRemarks] = useState("")
    const [valuePaymentTransferFreqOneTime, setValuePaymentTransferFreqOneTime] = useState(false)
    const [valuePaymentTransferFreqRec, setValuePaymentTransferFreqRec] = useState(false)
    const [valuePaymentTransferDate, setValuePaymentTransferDate] = useState(new Date())
    const [valuePaymentRecStartDate, setValuePaymentRecStartDate] = useState(new Date())
    const [valuePaymentRecEndDate, setValuePaymentRecEndDate] = useState(new Date())
    const [valuePaymentRecInterval, setValuePaymentRecInterval] = useState("")
    const [balanceChecking, setBalanceChecking] = useState(0)
    const [balanceSavings, setBalanceSavings] = useState(0)
    const [balanceTFS, setBalanceTFS] = useState(0)

    let currentUserID = null
    let currentUseremail = null

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is verified
                console.log("UID", user.uid + " - " + user.email);
                currentUserID = user.uid
                currentUseremail = user.email

                console.log(CommonFunction.randomNumberInRange(5, 15))

                getAccountDetails(currentUseremail)
                getBeneficiaryDetails(currentUseremail)

            } else {
                // User is signed out
                console.log("User is logged out. Please login!");
                navigate("/");
            }
        });
    }, []);

    //Fetching Account Details from Database
    function getAccountDetails(currentUseremail) {
        const queryData = query(dbRefAccount,
            where("username", "==", (currentUseremail)));
        const returnData = onSnapshot(queryData, (querySnapshot) => {
            let letMyAccountList = []
            querySnapshot.forEach((doc) => {
                letMyAccountList.push({ ...doc.data(), id: doc.id });

                //Initiate Account Balance
                setBalanceChecking(doc.data().amountChecking)
                setBalanceSavings(doc.data().amountSavings)
                setBalanceTFS(doc.data().amountTFS)
                console.log(doc.id, " => ", doc.data());
            });
            setAccountList(letMyAccountList);
        });
        return () => returnData();
    }

    //Fetching Beneficiary Details from Database
    function getBeneficiaryDetails(currentUseremail) {
        const queryData = query(dbRefAddBeneficiary,
            where("username", "==", (currentUseremail)));
        const returnData = onSnapshot(queryData, (querySnapshot) => {
            let letMyBeneficiaryList = []
            querySnapshot.forEach((doc) => {
                letMyBeneficiaryList.push({ ...doc.data(), id: doc.id });
                console.log(doc.id, " ==> ", doc.data());
            });
            setBeneficiaryList(letMyBeneficiaryList);
            console.log("Printing beneficiaryList => " + beneficiaryList)
        });
        return () => returnData();
    }



    /*Make Payment Handler*/
    function submitMakePayment(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        //Check the Payment from amount with the balance
        let fromAccountAmount = (valuePaymentTransferFrom == "Checking") ? balanceChecking :
            (valuePaymentTransferFrom == "Savings") ? balanceSavings :
                balanceTFS

        //Alert message for balance checking
        if (valuePaymentTransferAmount > fromAccountAmount) {
            alert("You dont have sufficient balance in your " + valuePaymentTransferFrom
                + " account to make this payment. \n\n" +
                (fromAccountAmount == 0 ? "" : "Please enter amount less than $"
                    + fromAccountAmount + "."))
        }
        else {
            alert("Good to go")
        }
    }

    return (

        // <LogoutApplication>
        <form method="post" onSubmit={submitMakePayment}>
            <div>
                {/*Insert NavBar*/}
                <NavBar />

                <div className="helloUser">
                    {accountList.map((myAccountDetails) => (
                        <h3>Hello
                            <span> {myAccountDetails.firstname}</span>!</h3>
                    ))}
                </div>

                <div className="paymentMain">

                    {/*Page Name*/}
                    <div className="paymentDiv">
                        <p className="paymentHeader">Enter Payment Details</p>
                    </div>

                    <div className="paymentDetails">

                        {/*Table Right - Additional info for Recurring Payment*/}
                        <div className="paymentTableRecurring">
                            {valuePaymentTransferFreqRec ?
                                <table className="paymentTableRight"
                                    id="paymentTableRightID">

                                    {/*Recurring - Payment Start Date*/}
                                    <tr>
                                        <div className="paymentRecStartDate">
                                            <label className="paymentRecStartDateLabel">
                                                <td className="column1"
                                                    id="paymentRecStartDatePick">
                                                    Start Date</td>
                                            </label>
                                            <td className="column2" id="datePickInline">
                                                <DatePicker
                                                    name="paymentRecurringStartDate"
                                                    showIcon
                                                    selected={valuePaymentRecStartDate}
                                                    placeholderText='Select Payment Start Date'
                                                    closeOnScroll={true}
                                                    required
                                                    value={valuePaymentRecStartDate}
                                                    onChange={(valuePaymentRecStartDate) => setValuePaymentRecStartDate(valuePaymentRecStartDate)}
                                                    placeholder="Remarks (optional)"
                                                    dateFormat={"dd/MMM/yyyy"}
                                                    minDate={new Date()}
                                                    filterDate={(valuePaymentRecStartDate => (valuePaymentRecStartDate.getDay() !== 0 &&
                                                        valuePaymentRecStartDate.getDay() !== 6))} />
                                            </td>
                                        </div>
                                    </tr>

                                    {/*Recurring - Payment End Date*/}
                                    <tr>
                                        <div className="paymentRecEndDate">
                                            <label className="paymentRecEndDateLabel">
                                                <td className="column1" id="paymentRecEndDatePick1">End Date</td>
                                            </label>
                                            <td className="column2" id="datePickInline">
                                                <DatePicker
                                                    name="paymentRecurringEndtDate"
                                                    showIcon
                                                    selected={valuePaymentRecEndDate}
                                                    placeholderText='Select Payment End Date'
                                                    closeOnScroll={true}
                                                    required
                                                    value={valuePaymentRecEndDate}
                                                    onChange={(valuePaymentRecEndDate) => setValuePaymentRecEndDate(valuePaymentRecEndDate)}
                                                    dateFormat={"dd/MMM/yyyy"}
                                                    minDate={new Date(valuePaymentRecStartDate)}
                                                    filterDate={(valuePaymentRecEndDate => (valuePaymentRecEndDate.getDay() !== 0
                                                        && valuePaymentRecEndDate.getDay() !== 6))} />
                                            </td>
                                        </div>
                                    </tr>

                                    {/*Recurring - Payment Interval*/}
                                    <tr>
                                        <div className="paymentRecInterval" id="paymentRecInterval-id">
                                            <label className="paymentRecIntervalLabel">
                                                <td className="column1">Interval
                                                </td>
                                                <td className="column2">
                                                    <span id="paymentRecIntervalInput">
                                                        <select
                                                            value={valuePaymentRecInterval}
                                                            required
                                                            onChange={(e) => setValuePaymentRecInterval(e.target.value)}
                                                        >
                                                            <option value="Daily"
                                                                id="Daily">Daily</option>
                                                            <option value="Weekly"
                                                                id="Weekly">Weekly</option>
                                                            <option value="Monthly"
                                                                id="Monthly">Monthly</option>
                                                        </select>
                                                    </span>
                                                </td>
                                            </label>
                                        </div>
                                    </tr>
                                </table>
                                : null}
                        </div>


                        {/*Table Left - Payment Main Information*/}
                        <div className="paymentTableMain">
                            <table className="paymentTableLeft">
                                <tr>
                                    <div className="paymentTransferFrom" id="paymentTransferFrom">
                                        <label className="paymentLabel">
                                            <td className="column1">Transfer From
                                            </td>
                                            <td className="column2">
                                                <span id="paymentInput">
                                                    <select
                                                        name="paymentTransferFrom"
                                                        autoFocus
                                                        value={valuePaymentTransferFrom}
                                                        required
                                                        onChange={
                                                            (e) => {
                                                                { setValuePaymentTransferFrom(e.target.value) }
                                                                console.log(e.target.value)
                                                            }
                                                        }
                                                    >
                                                        {accountList.map((myAccountDetails) => (
                                                            <>
                                                                <option value="Checking"
                                                                    id="Checking">Checking Account - ${(myAccountDetails.amountChecking)}</option>
                                                                <option value="Savings"
                                                                    id="Savings">Savings Account - ${(myAccountDetails.amountSavings)}</option>
                                                                <option value="TFS"
                                                                    id="TFS">TFS Account - ${(myAccountDetails.amountTFS)}</option>
                                                            </>
                                                        ))}
                                                    </select>
                                                    <button type="input" name="paymentAddBalance"
                                                        id="paymentAddBalance">
                                                        <span>+</span> Add Cash Deposit
                                                    </button>
                                                </span>
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="paymentTransferTo" id="paymentDiv">
                                        <label className="paymentLabel">
                                            <td className="column1">Transfer To
                                            </td>
                                            <td className="column2">
                                                <span id="paymentInput">
                                                    <select id="paymentInputList"
                                                        name="paymentTransferTo"
                                                        required
                                                        value={valuePaymentTransferTo}
                                                        onChange={(e) => setValuePaymentTransferTo(e.target.value)}
                                                    >
                                                        {
                                                            (valuePaymentTransferFrom === 'Checking')
                                                                ?
                                                                beneficiaryList.map((myBeneficiaryDetails) => (
                                                                    <option>{myBeneficiaryDetails.beneficiaryName}</option>))
                                                                :
                                                                <option value="beneficiary1"
                                                                    id="beneficiary1">Checking Account</option>
                                                        }
                                                    </select>
                                                </span>
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="paymentAmount" id="paymentDiv">
                                        <label className="paymentLabel">
                                            <td className="column1">Amount $</td>
                                            <td className="column2">
                                                <input type="text"
                                                    name="paymentTransferAmount"
                                                    id="paymentIDAmount"
                                                    required
                                                    onInput={F => F.target.setCustomValidity('')}
                                                    onInvalid={F => F.target.setCustomValidity('Please enter amount here')}
                                                    value={valuePaymentTransferAmount}
                                                    onChange={(e) => setValuePaymentTransferAmount(e.target.value)}
                                                />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="paymentRemarks" id="paymentDiv">
                                        <label className="paymentLabel">
                                            <td className="column1">
                                                Remarks
                                            </td>
                                            <td className="column2">
                                                <input type="text"
                                                    name="paymentTransferRemarks"
                                                    id="paymentIDRemarks"
                                                    required
                                                    onInput={F => F.target.setCustomValidity('')}
                                                    onInvalid={F => F.target.setCustomValidity('Please enter remarks here')}
                                                    value={valuePaymentTransferRemarks}
                                                    onChange={(e) => setValuePaymentTransferRemarks(e.target.value)}
                                                />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="paymentFrequency" id="paymentDiv">
                                        <div>
                                            <td className="column1">
                                                <label className="paymentLabel">
                                                    Frequency
                                                </label>
                                            </td>
                                            <td className="column2">
                                                <label className="paymentFrequencyLabel"
                                                    id="paymentIDFreqOneTime">
                                                    <input type="radio"
                                                        name="PaymentTransferFreqRec"
                                                        required
                                                        onInput={F => F.target.setCustomValidity('')}
                                                        onInvalid={F => F.target.setCustomValidity('Please select one of the Frequency')}
                                                        value={valuePaymentTransferFreqRec}
                                                        onClick={(e) => setValuePaymentTransferFreqRec(false)}
                                                    />
                                                    <span className="paymentFreq">One Time</span>
                                                </label>
                                                <label className="paymentFrequencyLabel"
                                                    id="paymentIDFreqRecurring">
                                                    <input type="radio"
                                                        name="PaymentTransferFreqRec"
                                                        value={valuePaymentTransferFreqRec}
                                                        onClick={(e) => setValuePaymentTransferFreqRec(true)} />
                                                    <span className="paymentFreq">Recurring</span>
                                                </label>
                                            </td>
                                        </div>
                                    </div>
                                </tr>

                                <tr>
                                    {valuePaymentTransferFreqRec ? null :
                                        <div className="paymentDate">
                                            <label className="paymentLabel">
                                                <td className="column1" id="paymentDatePick1">Payment Date</td>
                                            </label>
                                            <td className="column2" id="datePickInline">
                                                <DatePicker
                                                    name="paymentOnetimeDatePicked"
                                                    showIcon
                                                    selected={valuePaymentTransferDate}
                                                    closeOnScroll={true}
                                                    value={valuePaymentTransferDate}
                                                    onChange={(valuePaymentTransferDate) => setValuePaymentTransferDate(valuePaymentTransferDate)}
                                                    dateFormat={"dd/MMM/yyyy"}
                                                    minDate={new Date()}
                                                    filterDate={
                                                        valuePaymentTransferDate => (valuePaymentTransferDate.getDay() !== 0 &&
                                                            valuePaymentTransferDate.getDay() !== 6)} />
                                            </td>
                                        </div>}
                                </tr>

                            </table>
                        </div>

                    </div>

                    <div className="paymentMakePayment" id="paymentDiv">
                        <button type="submit" name="paymentNameMakePayment"
                            id="paymentIDMakePayment">
                            Make Payment
                        </button>
                    </div>

                </div>
            </div>

            <div className="footer">
                <footer className="footerText">
                    {/*Insert Footer*/}
                    <Footer />
                </footer>
            </div>
        </form>
        // </LogoutApplication>
    )
}
