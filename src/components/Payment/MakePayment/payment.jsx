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

    // date picker
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [paymentRecStartDate, setPaymentRecStartDate] = useState(new Date());
    const [paymentRecEndDate, setPaymentRecEndDate] = useState(new Date());

    // Payment Frequency Change (Onetime - Recurring)
    //const [state, setState] = useState(initialState);
    const [paymentFreq, setpaymentFreq] = useState(false)

    const navigate = useNavigate();

    const dbRefAccount = collection(db, "userAccount");
    const dbRefAddBeneficiary = collection(db, "userBeneficiary");
    const dbRefTransaction = collection(db, "userTransaction");
    const [accountList, setAccountList] = useState([]);
    const [beneficiaryList, setBeneficiaryList] = useState([]);
    const [loading, setLoading] = useState(true);

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
            console.log(beneficiaryList)
        });
        return () => returnData();
    }

    function handlePaymentFreqChange(paymentFreqCurrent) {
        const getElement = document.getElementById("paymentTableRightID")
        /*if (paymentFreqCurrent === 'recurring') {
            getElement.setAttribute("visibility","visible")
            console.log(getElement)
        }
        else {
            getElement.setAttribute("visibility","hidden")
        }*/
    }

    // Recurring Start and End date change
    function handleStartEndDateMatch() {

    }

    const onOptionChange = (e) => {
        setpaymentFreq(e.target.value)
        handlePaymentFreqChange(e.target.value)
    }

    //Input from the Payment page
    const [valuePaymentTransferFrom, setValuePaymentTransferFrom] = useState("Account1")
    const [valuePaymentTransferTo, setValuePaymentTransferTo] = useState("")
    const [valuePaymentTransferAmount, setValuePaymentTransferAmount] = useState("")
    const [valuePaymentTransferRemarks, setValuePaymentTransferRemarks] = useState("")
    const [valuePaymentTransferFreqOneTime, setValuePaymentTransferFreqOneTime] = useState("")
    const [valuePaymentTransferFreqRec, setValuePaymentTransferFreqRec] = useState("")
    const [valuePaymentTransferDate, setValuePaymentTransferDate] = useState("")
    const [valuePaymentRecStartDate, setValuePaymentRecStartDate] = useState("")
    const [valuePaymentRecEndDate, setValuePaymentRecEndDate] = useState("")
    const [valuePaymentRecInterval, setValuePaymentRecInterval] = useState("")

    let currentBalanceChecking = 0
    let currentBalanceSavings = 0
    let currentBalanceTFS = 0

    function initiateBalances() {
        accountList.map((myAccountDetails) => (
            currentBalanceChecking = myAccountDetails.amountChecking
        ))
        accountList.map((myAccountDetails) => (
            currentBalanceSavings = myAccountDetails.amountSavings
        ))
        accountList.map((myAccountDetails) => (
            currentBalanceTFS = myAccountDetails.amountTFS
        ))
    }

    /*Make Payment Handler*/
    function submitMakePayment(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

    }

    function handleTransferFrom(inputElement) {

        console.log("reached handleTransferFrom")
        console.log(inputElement)
        //(e) => setValuePaymentTransferFrom(e.target.value)
    }




    return (

        // <LogoutApplication>
        <form method="post" onSubmit={submitMakePayment}>
            <div>
                {/*Insert NavBar*/}
                <NavBar />

                {initiateBalances()}

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
                            {paymentFreq ?
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
                                                    selected={paymentRecStartDate}
                                                    placeholderText='Select Payment Start Date'
                                                    closeOnScroll={true}
                                                    onChange={(paymentRecStartDate) => setPaymentRecStartDate(paymentRecStartDate)}
                                                    placeholder="Remarks (optional)"
                                                    dateFormat={"dd/MMM/yyyy"}
                                                    minDate={new Date()}
                                                    filterDate={(paymentRecStartDate => (paymentRecStartDate.getDay() !== 0 &&
                                                        paymentRecStartDate.getDay() !== 6))} />
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
                                                    selected={paymentRecEndDate}
                                                    placeholderText='Select Payment End Date'
                                                    closeOnScroll={true}
                                                    value={valuePaymentRecEndDate}
                                                    onChange={(paymentRecEndDate) => setPaymentRecEndDate(paymentRecEndDate)}
                                                    dateFormat={"dd/MMM/yyyy"}
                                                    minDate={new Date(paymentRecStartDate)}
                                                    filterDate={(paymentRecEndDate => (paymentRecEndDate.getDay() !== 0
                                                        && paymentRecEndDate.getDay() !== 6))} />
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
                                                            onChange={(e) => setValuePaymentRecInterval(e.target.value)}
                                                        >
                                                            <option value="Account1"
                                                                id="Account1">Daily</option>
                                                            <option value="Account2"
                                                                id="Account2">Weekly</option>
                                                            <option value="Account3"
                                                                id="Account3">Monthly</option>
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
                                                        autoFocus
                                                        value={valuePaymentTransferFrom}
                                                        onChange={
                                                            (e) => {
                                                                { setValuePaymentTransferFrom(e.target.value) }
                                                                console.log(e.target.value)
                                                            }
                                                        }
                                                    >
                                                        {accountList.map((myAccountDetails) => (
                                                            <>
                                                                <option value="Account1"
                                                                    id="Account1">Checking Account - ${(myAccountDetails.amountChecking)}</option>
                                                                <option value="Account2"
                                                                    id="Account2">Savings Account - ${(myAccountDetails.amountSavings)}</option>
                                                                <option value="Account3"
                                                                    id="Account3">TFS Account - ${(myAccountDetails.amountTFS)}</option>
                                                            </>
                                                        ))}
                                                    </select>
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
                                                        name="Select Beneficiary"
                                                        value={valuePaymentTransferTo}
                                                        onChange={(e) => setValuePaymentTransferTo(e.target.value)}
                                                    >
                                                        {
                                                            (valuePaymentTransferFrom == 'Account1')
                                                                ?
                                                                beneficiaryList.map((myBeneficiaryDetails) => (
                                                                    <option value="beneficiary1"
                                                                        id="beneficiary1">{myBeneficiaryDetails.beneficiaryName}</option>))
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
                                                    name="paymentNameAmount"
                                                    id="paymentIDAmount"
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
                                                    name="paymentNameRemarks"
                                                    id="paymentIDRemarks"
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
                                                        name="paymentNameFrequency"
                                                        value={setValuePaymentTransferFreqOneTime}
                                                        onClick={(e) => setpaymentFreq(false)}
                                                    />
                                                    <span className="paymentFreq">One Time</span>
                                                </label>
                                                <label className="paymentFrequencyLabel"
                                                    id="paymentIDFreqRecurring">
                                                    <input type="radio"
                                                        name="paymentNameFrequency"
                                                        value={setValuePaymentTransferFreqRec}
                                                        onClick={() => setpaymentFreq(true)} />
                                                    <span className="paymentFreq">Recurring</span>
                                                </label>
                                            </td>
                                        </div>
                                    </div>
                                </tr>

                                <tr>
                                    {paymentFreq ? null :
                                        <div className="paymentDate">
                                            <label className="paymentLabel">
                                                <td className="column1" id="paymentDatePick1">Payment Date</td>
                                            </label>
                                            <td className="column2" id="datePickInline">
                                                <DatePicker
                                                    name="paymentOnetimeDatePicked"
                                                    value={valuePaymentTransferDate}
                                                    showIcon
                                                    selected={paymentDate}
                                                    closeOnScroll={true}
                                                    onChange={(paymentDate) => setPaymentDate(paymentDate)}
                                                    dateFormat={"dd/MMM/yyyy"}
                                                    minDate={new Date()}
                                                    filterDate={
                                                        paymentDate => (paymentDate.getDay() !== 0 &&
                                                            paymentDate.getDay() !== 6)} />
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