import React, { useState, Component } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


import NavBar from "./navbar"
import Footer from "./footer"
import "./styles_home.css"
import "./styles_payment.css"
import "./variables"

export default function Payment() {

    // date picker
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [paymentRecStartDate, setPaymentRecStartDate] = useState(new Date());
    const [paymentRecEndDate, setPaymentRecEndDate] = useState(new Date());


    // Prevent the browser from reloading the page
    function handleSubmit(e) {
        e.preventDefault();
        //console.log("You have submitted:", this.state.selectedOption);

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        /*
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });*/

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    //https://react.dev/reference/react-dom/components/input#caveats

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div>
                {/*Insert NavBar*/}
                <NavBar />

                <div className="paymentMain">

                    {/*Page Name*/}
                    <div className="paymentDiv">
                        <p className="paymentHeader">Enter Payment Details</p>
                    </div>

                    <div className="paymentDetails">

                        {/*Table Left - Payment Main Information*/}
                        <div className="paymentTableMain">
                            <table className="paymentTableLeft">
                                <tr>
                                    <div className="paymentTransferFrom" id="paymentTransferFrom">
                                        <label className="paymentLabel">
                                            <td className="column1">Transfer From:
                                            </td>
                                            <td className="column2">
                                                <span id="paymentInput">
                                                    <select>
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
                                            <td className="column1">Transfer To:
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
                                            <td className="column1">Amount $:</td>
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
                                                Remarks:
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
                                                    Frequency:
                                                </label>
                                            </td>
                                            <td className="column2">
                                                <label className="paymentFrequencyLabel"
                                                    id="paymentIDFreqOneTime">
                                                    <input type="radio" name="paymentNameFrequency"
                                                        value="onetime" />
                                                    <span className="paymentFreq">One Time</span>
                                                </label>
                                                <label className="paymentFrequencyLabel"
                                                    id="paymentIDFreqRecurring">
                                                    <input type="radio" name="paymentNameFrequency"
                                                        value="recurring" />
                                                    <span className="paymentFreq">Recurring</span>
                                                </label>
                                            </td>
                                        </div>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="paymentDate">
                                        <label className="paymentLabel">
                                            <td className="column1" id="paymentDatePick1">Payment Date:</td>
                                        </label>
                                        <td className="column2" id="paymentDatePick">
                                            <DatePicker
                                                name="paymentOnetimeDatePicked"
                                                showIcon
                                                selected={paymentDate}
                                                closeOnScroll={true}
                                                onChange={(paymentDate) => setPaymentDate(paymentDate)}
                                                dateFormat={"dd/MMM/yyyy"}
                                                minDate={new Date()}
                                                filterDate={((paymentDate => paymentDate.getDay() !== 2)
                                                    && (paymentDate => paymentDate.getDay() !== 6))}
                                            />
                                        </td>
                                    </div>
                                </tr>

                            </table>
                        </div>


                        {/*Table Right - Additional info for Recurring Payment*/}
                        <div className="paymentTableRecurring">
                            <table className="paymentTableRight">

                                {/*Recurring - Payment Start Date*/}
                                <tr>
                                    <div className="paymentDate">
                                        <label className="paymentLabel">
                                            <td className="column1" id="paymentDatePick1">Start Date:</td>
                                        </label>
                                        <td className="column2" id="paymentDatePick">
                                            <DatePicker
                                                name="paymentRecurringStartDate"
                                                showIcon
                                                selected={paymentRecStartDate}
                                                closeOnScroll={true}
                                                onChange={(paymentRecStartDate) => setPaymentRecStartDate(paymentRecStartDate)}
                                                dateFormat={"dd/MMM/yyyy"}
                                                minDate={new Date()}
                                                filterDate={((paymentRecStartDate => paymentRecStartDate.getDay() !== 2)
                                                    && (paymentRecStartDate => paymentRecStartDate.getDay() !== 6))}
                                            />
                                        </td>
                                    </div>
                                </tr>

                                {/*Recurring - Payment End Date*/}
                                <tr>
                                    <div className="paymentDate">
                                        <label className="paymentLabel">
                                            <td className="column1" id="paymentDatePick1">End Date:</td>
                                        </label>
                                        <td className="column2" id="paymentDatePick">
                                            <DatePicker
                                                name="paymentRecurringEndtDate"
                                                showIcon
                                                selected={paymentRecEndDate}
                                                closeOnScroll={true}
                                                onChange={(paymentRecEndDate) => setPaymentRecEndDate(paymentRecEndDate)}
                                                dateFormat={"dd/MMM/yyyy"}
                                                minDate={new Date()}
                                                filterDate={((paymentRecEndDate => paymentRecEndDate.getDay() !== 2)
                                                    && (paymentRecEndDate => paymentRecEndDate.getDay() !== 6))}
                                            />
                                        </td>
                                    </div>
                                </tr>

                                {/*Recurring - Payment Interval*/}
                                <tr>
                                    <div className="paymentTransferFrom" id="paymentTransferFrom">
                                        <label className="paymentLabel">
                                            <td className="column1">Interval:
                                            </td>
                                            <td className="column2">
                                                <span id="paymentInput">
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
    )
}