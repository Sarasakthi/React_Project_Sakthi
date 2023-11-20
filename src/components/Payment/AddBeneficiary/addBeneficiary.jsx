import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import NavBar from "../../Common/Navbar/navbar"
import Footer from "../../Common/Footer/footer"
import "../../Home/styles_home.css"
import "./styles_addBeneficiary.css"
import "../../Common/General/variables"

import * as FunctionCommon from "../../Common/General/commonFunctions"

export default function AddBeneficiary() {
    return (
        <form method="post" onSubmit={FunctionCommon.handleSubmit}>
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
                                        <label className="beneficiaryNameLabel">
                                            <td className="column1">Beneficiary Name</td>
                                            <td className="column2">
                                                <input type="text" name="beneficiaryNameAmount"
                                                    id="beneficiaryIDAmount"
                                                    autoFocus />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="beneficiaryAccountNo" id="beneficiaryDiv">
                                        <label className="beneficiaryLabel">
                                            <td className="column1">Beneficiary Email</td>
                                            <td className="column2">
                                                <input type="text" name="beneficiaryNameAccountNo"
                                                    id="beneficiaryIDAccountNo" />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="beneficiaryRemarks" id="beneficiaryDiv">
                                        <label className="beneficiaryLabel">
                                            <td className="column1">
                                                Remarks <span className="optional">(Optional)</span>
                                            </td>
                                            <td className="column2">
                                                <input type="text" name="beneficiaryNameRemarks"
                                                    id="beneficiaryIDRemarks" />
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