import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import NavBar from "../../Common/Navbar/navbar"
import Footer from "../../Common/Footer/footer"

import "../../Home/styles_home.css"
import "./styles_addBeneficiary.css"
import "../../Common/General/variables"

/*Adding authentication check*/
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

import * as FunctionCommon from "../../Common/General/commonFunctions"
import * as databaseQuery from "../../Firebase/dbQuery"

import { Navigate } from "react-router-dom";

export default function AddBeneficiary() {

    const navigate = useNavigate();

    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [beneficiaryEmail, setBeneficiaryEmail] = useState("");
    const [beneficiaryRemarks, setBeneficiaryRemarks] = useState("");

    /*Add Beneficiary*/
    const submitAddBeneficiary = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        let username = databaseQuery.currentUID().email
        console.log(username)

        //Adding Beneficiary Details To DB
        databaseQuery.addBeneficiaryToDB(
            beneficiaryName,
            beneficiaryEmail,
            beneficiaryRemarks)

        navigate("/payment")
    }


    return (
        <form method="post" onSubmit={submitAddBeneficiary}>
            <div>
                {/*Insert NavBar*/}
                <NavBar />

                <div className="beneficiaryMain">

                    {/*Page Name*/}
                    <div className="beneficiaryDiv">
                        <p className="beneficiaryHeader">Add Beneficiary</p>
                    </div>

                    <div className="beneficiaryDetails">

                        {/*Table Left - beneficiary Main Information*/}
                        <div className="beneficiaryTableMain">
                            <table className="beneficiaryTableLeft">
                                <tr>
                                    <div className="beneficiaryName" id="beneficiaryNameID">
                                        <label className="beneficiaryNameLabel"
                                            title="Enter beneficiary name">
                                            <td className="column1">Beneficiary Name</td>
                                            <td className="column2">
                                                <input type="text" name="beneficiaryNameAmount"
                                                    id="beneficiaryIDAmount"
                                                    value={beneficiaryName}
                                                    onChange={(e) => setBeneficiaryName(e.target.value)}
                                                    autoFocus
                                                    required
                                                    placeholder="Beneficiary name"
                                                    onInput={F => F.target.setCustomValidity('')} 
                                                    onInvalid={F => F.target.setCustomValidity('Please enter beneficiary name here')}
                                                />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="beneficiaryAccountNo" id="beneficiaryDiv">
                                        <label className="beneficiaryLabel"
                                            title="Enter beneficiary email">
                                            <td className="column1">Beneficiary Email</td>
                                            <td className="column2">
                                                <input type="email" name="beneficiaryNameAccountNo"
                                                    id="beneficiaryIDAccountNo"
                                                    value={beneficiaryEmail}
                                                    onChange={(e) => setBeneficiaryEmail(e.target.value)}
                                                    placeholder="Beneficiary email"
                                                    required
                                                    onInput={F => F.target.setCustomValidity('')} 
                                                    onInvalid={F => F.target.setCustomValidity('Please enter beneficiary email here')}

                                                />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="beneficiaryRemarks" id="beneficiaryDiv">
                                        <label className="beneficiaryLabel"
                                            title="Enter remarks (optional)">
                                            <td className="column1">
                                                Remarks <span className="optional">(Optional)</span>
                                            </td>
                                            <td className="column2">
                                                <input type="text" name="beneficiaryNameRemarks"
                                                    id="beneficiaryIDRemarks"
                                                    value={beneficiaryRemarks}
                                                    onChange={(e) => setBeneficiaryRemarks(e.target.value)}
                                                    placeholder="Remarks (optional)" />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                            </table>
                        </div>

                    </div>

                    <div className="beneficiaryMakebeneficiary" id="beneficiaryDiv">
                        <button type="submit" name="beneficiaryNameMakebeneficiary"
                            id="beneficiaryIDMakebeneficiary">
                            Add beneficiary
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
        </form>
    )
}