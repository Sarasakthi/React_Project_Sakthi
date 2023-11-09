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
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
    
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
                    <p
                        className="paymentHeader"
                    /*style={{ fontFamily: 'Ubuntu' }}*/
                    >Enter Payment Details</p>
                </div>

                <div className="paymentDetails">
                    <ul>
                        <li><label> Transfer From:
                            <input type="text" name="paymentTransferFrom" /></label>
                        </li>

                        <li><label> Transfer To:
                            <input type="text" name="paymentTransferTo" /></label>
                        </li>

                        <li><label> Transfer Amount$:
                            <input type="text" name="paymentAmount" /></label>
                        </li>

                        <li><label> Remarks:
                            <input type="text" name="paymentRemarks" /></label>
                        </li>

                        <li>
                            <select>
                                <option value="One Time">One Time</option>
                                <option value="Recurring">Recurring</option>
                            </select>
                            <label>
                                <input type="radio" name="freqOneTime" value="onetime" checked />One Time</label>
                            <label>
                                <input type="radio" name="freqRecurring" value="recurring" />Recurring</label>
                        </li>

                        <li>
                            <input type="submit" name="paymentMakePayment" />
                        </li>
                    </ul>

                </div>


                <footer className="footerText">
                    {/*Insert Footer*/}
                    <Footer />
                </footer>
            </div>
        </form>
    )
}