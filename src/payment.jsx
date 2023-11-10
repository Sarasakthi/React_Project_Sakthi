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

                {/*Page Name*/}
                <div className="paymentDiv">
                    <p className="paymentHeader">Enter Payment Details</p>
                </div>

                <div className="paymentDetails">
                    <div className="paymentFormGroup">
                        
                        <div className="paymentTransferFrom" id="paymentDiv">
                            <label className="paymentLabel">Transfer From:
                                <select>
                                    <option value="Account1" id="Account1" >Checking Account</option>
                                    <option value="Account2" id="Account2">Savings Account</option>
                                    <option value="Account3" id="Account3">TFS Account</option>
                                </select>
                            </label>
                        </div>

                        <div className="paymentTransferTo" id="paymentDiv">
                        <label className="paymentLabel">Transfer From:
                                <select>
                                    <option value="beneficiary1" id="beneficiary1" >Beneficiary 1</option>
                                    <option value="beneficiary2" id="beneficiary2">Beneficiary 2</option>
                                    <option value="beneficiary3" id="beneficiary3">Beneficiary 3</option>
                                    <option value="beneficiary4" id="beneficiary4">Beneficiary 4</option>
                                    <option value="beneficiary5" id="beneficiary5">Beneficiary 5</option>
                                </select>
                            </label>
                        </div>

                        <div className="paymentAmount" id="paymentDiv">
                            <label className="paymentLabel">Transfer Amount$:
                                <input type="text" name="paymentNameAmount" id="paymentIDAmount" /></label>
                        </div>

                        <div className="paymentRemarks" id="paymentDiv">
                            <label className="paymentLabel">Remarks:
                                <input type="text" name="paymentNameRemarks" id="paymentIDRemarks" /></label>
                        </div>

                        <div className="paymentFrequency" id="paymentDiv">
                            <label className="paymentLabel">Frequency:
                                <div>
                                    <input type="radio" name="paymentNameFrequency" id="paymentIDFreqOneTime"
                                        value="onetime" />One Time
                                    <input type="radio" name="paymentNameFrequency" id="paymentIDFreqRecurring"
                                        value="recurring" />Recurring
                                </div>
                            </label>
                        </div>


                        <div className="paymentMakePayment" id="paymentDiv">
                            <button type="submit" name="paymentNameMakePayment" id="paymentIDMakePayment">
                                Make Payment
                            </button>
                        </div>
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
    )
}