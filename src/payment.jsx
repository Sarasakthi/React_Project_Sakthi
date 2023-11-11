import React from "react";
import NavBar from "./navbar"
import Footer from "./footer"
import "./styles_home.css"
import "./styles_payment.css"
import "./variables"

export default function Payment() {

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
                        <table className="paymentRow">
                            <tr>
                                <div className="paymentTransferFrom" id="paymentTransferFrom">
                                    <label className="paymentLabel">
                                        <td className="column-1">Transfer From:
                                        </td>
                                        <td className="column-2">
                                            <span id="paymentInput">
                                                <select>
                                                    <option value="Account1" id="Account1" >Checking Account</option>
                                                    <option value="Account2" id="Account2">Savings Account</option>
                                                    <option value="Account3" id="Account3">TFS Account</option>
                                                </select>
                                            </span>
                                        </td>
                                    </label>
                                </div>
                            </tr>

                            <tr>
                                <div className="paymentTransferTo" id="paymentDiv">
                                    <label className="paymentLabel">
                                        <td className="column-1">Transfer To:
                                        </td>
                                        <td className="column-2">
                                            <span id="paymentInput">
                                                <select>
                                                    <option value="beneficiary1" id="beneficiary1" >Beneficiary 1</option>
                                                    <option value="beneficiary2" id="beneficiary2">Beneficiary 2</option>
                                                    <option value="beneficiary3" id="beneficiary3">Beneficiary 3</option>
                                                    <option value="beneficiary4" id="beneficiary4">Beneficiary 4</option>
                                                    <option value="beneficiary5" id="beneficiary5">Beneficiary 5</option>
                                                </select>
                                            </span>
                                        </td>
                                    </label>
                                </div>
                            </tr>

                            <tr>
                                <div className="paymentAmount" id="paymentDiv">
                                    <label className="paymentLabel">
                                        <td className="column-1">Amount $:</td>
                                        <td className="column-2">
                                            <input type="text" name="paymentNameAmount" id="paymentIDAmount" />
                                        </td>
                                    </label>
                                </div>
                            </tr>

                            <tr>
                                <div className="paymentRemarks" id="paymentDiv">
                                    <label className="paymentLabel">
                                        <td className="column-1">
                                            Remarks:
                                        </td>
                                        <td className="column-2">
                                            <input type="text" name="paymentNameRemarks" id="paymentIDRemarks" />
                                        </td>
                                    </label>
                                </div>
                            </tr>

                            <tr>
                                <div className="paymentFrequency" id="paymentDiv">
                                    <div>
                                        <td className="column-1">
                                            <label className="paymentLabel">
                                                Frequency:
                                            </label>
                                        </td>
                                        <td className="column-2">
                                            <label>
                                                <input type="radio" name="paymentNameFrequency"
                                                    id="paymentIDFreqOneTime"
                                                    className="paymentNameFrequency"
                                                    value="onetime" />One Time</label>
                                            <label>
                                                <input type="radio" name="paymentNameFrequency"
                                                    id="paymentIDFreqRecurring"
                                                    className="paymentNameFrequency"
                                                    value="recurring" />Recurring
                                            </label>
                                        </td>
                                    </div>
                                </div>
                            </tr>
                        </table>
                    </div>
                    <div className="paymentMakePayment" id="paymentDiv">
                        <button type="submit" name="paymentNameMakePayment" id="paymentIDMakePayment">
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