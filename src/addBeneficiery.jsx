import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import NavBar from "./navbar"
import Footer from "./footer"
import "./styles_home.css"
import "./styles_addBeneficiery.css"
import "./variables"

import * as FunctionCommon from "./commonFunctions"

export default function AddBeneficiery() {
    return (
        <form method="post" onSubmit={FunctionCommon.handleSubmit}>
            <div>
                {/*Insert NavBar*/}
                <NavBar />

                <div className="beneficieryMain">

                    {/*Page Name*/}
                    <div className="beneficieryDiv">
                        <p className="beneficieryHeader">Add Beneficiery</p>
                    </div>

                    <div className="beneficieryDetails">

                        {/*Table Left - beneficiery Main Information*/}
                        <div className="beneficieryTableMain">
                            <table className="beneficieryTableLeft">
                                <tr>
                                    <div className="beneficieryName" id="beneficieryNameID">
                                        <label className="beneficieryNameLabel">
                                            <td className="column1">Beneficiery Name</td>
                                            <td className="column2">
                                                <input type="text" name="beneficieryNameAmount"
                                                    id="beneficieryIDAmount" />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="beneficieryAccountNo" id="beneficieryDiv">
                                        <label className="beneficieryLabel">
                                            <td className="column1">Beneficiery A/C No</td>
                                            <td className="column2">
                                                <input type="text" name="beneficieryNameAccountNo"
                                                    id="beneficieryIDAccountNo" />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                                <tr>
                                    <div className="beneficieryRemarks" id="beneficieryDiv">
                                        <label className="beneficieryLabel">
                                            <td className="column1">
                                                Remarks:
                                            </td>
                                            <td className="column2">
                                                <input type="text" name="beneficieryNameRemarks"
                                                    id="beneficieryIDRemarks" />
                                            </td>
                                        </label>
                                    </div>
                                </tr>

                            </table>
                        </div>

                    </div>

                    <div className="beneficieryMakebeneficiery" id="beneficieryDiv">
                        <button type="submit" name="beneficieryNameMakebeneficiery"
                            id="beneficieryIDMakebeneficiery">
                            Add Beneficiery
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