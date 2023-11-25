import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import NavBar from "../../Common/Navbar/navbar"
import Footer from "../../Common/Footer/footer"
import LogoutApplication from "../../Logout/autoLogout";

import "../../Home/styles_home.css"
import "./styles_payment.css"
import "../../Common/General/variables"
import "../../Common/General/styles_common.css"

export default function Payment() {

    // date picker
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [paymentRecStartDate, setPaymentRecStartDate] = useState(new Date());
    const [paymentRecEndDate, setPaymentRecEndDate] = useState(new Date());

    // Payment Frequency Change (Onetime - Recurring)
    //const [state, setState] = useState(initialState);
    const [paymentFreq, setpaymentFreq] = useState(false)

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

    /*Make Payment Handler*/
    function submitMakePayment(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        console.log('Exiting add bene')

    }

    return (
        <LogoutApplication>
            <form method="post" onSubmit={submitMakePayment}>
                <div>
                    {/*Insert NavBar*/}
                    <NavBar />

                    <div className="paymentMain">

                        {/*Page Name*/}
                        <div className="paymentDiv">
                            <p className="paymentHeader">Enter Payment Details</p>
                        </div>

                        <div className="paymentDetails">

                            {/*Table Right - Additional info for Recurring Payment*/}
                            <div className="paymentTableRecurring">
                                {
                                    paymentFreq ?
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
                                                            dateFormat={"dd/MMM/yyyy"}
                                                            minDate={new Date()}
                                                            filterDate={(paymentRecStartDate =>
                                                            (paymentRecStartDate.getDay() !== 0 &&
                                                                paymentRecStartDate.getDay() !== 6))}
                                                        />
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
                                                            onChange={(paymentRecEndDate) => setPaymentRecEndDate(paymentRecEndDate)}
                                                            dateFormat={"dd/MMM/yyyy"}
                                                            minDate={new Date(paymentRecStartDate)}
                                                            filterDate={(paymentRecEndDate => (paymentRecEndDate.getDay() !== 0
                                                                && paymentRecEndDate.getDay() !== 6))}
                                                        />
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
                                                                <select>
                                                                    <option value="Account1"
                                                                        id="Account1" >Daily</option>
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
                                        : null
                                }
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
                                                            autoFocus>
                                                            <option value="Account1"
                                                                id="Account1" >Checking Account</option>
                                                            <option value="Account2"
                                                                id="Account2">Savings Account</option>
                                                            <option value="Account3"
                                                                id="Account3">TFS Account</option>
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
                                                        <select id="paymentInputList" name="Select Beneficiary">
                                                            <option value="beneficiary1"
                                                                id="beneficiary1" >Beneficiary 1</option>
                                                            <option value="beneficiary2"
                                                                id="beneficiary2">Beneficiary 2</option>
                                                            <option value="beneficiary3"
                                                                id="beneficiary3">Beneficiary 3</option>
                                                            <option value="beneficiary4"
                                                                id="beneficiary4">Beneficiary 4</option>
                                                            <option value="beneficiary5"
                                                                id="beneficiary5">Beneficiary 5</option>
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
                                                    <input type="text" name="paymentNameAmount"
                                                        id="paymentIDAmount" />
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
                                                    <input type="text" name="paymentNameRemarks"
                                                        id="paymentIDRemarks" />
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
                                                            value="onetime"
                                                            onClick={() => setpaymentFreq(false)}
                                                        />
                                                        <span className="paymentFreq">One Time</span>
                                                    </label>
                                                    <label className="paymentFrequencyLabel"
                                                        id="paymentIDFreqRecurring">
                                                        <input type="radio"
                                                            name="paymentNameFrequency"
                                                            value="recurring"
                                                            onClick={() => setpaymentFreq(true)}
                                                        />
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
                                                        showIcon
                                                        selected={paymentDate}
                                                        closeOnScroll={true}
                                                        onChange={(paymentDate) => setPaymentDate(paymentDate)}
                                                        dateFormat={"dd/MMM/yyyy"}
                                                        minDate={new Date()}
                                                        filterDate={
                                                            paymentDate => (paymentDate.getDay() !== 0 &&
                                                                paymentDate.getDay() !== 6)
                                                        }
                                                    />
                                                </td>
                                            </div>
                                        }
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

                    </div >
                </div >

                <div className="footer">
                    <footer className="footerText">
                        {/*Insert Footer*/}
                        <Footer />
                    </footer>
                </div>
            </form >
        </LogoutApplication>
    )
}