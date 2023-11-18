import React from "react";

import Footer from "./footer"
import "./styles_signup.css"
import * as FunctionCommon from "./commonFunctions"
import ImageLogo from "./img/logo.svg"

export default function Contact() {
    return (
        <form method="post" onSubmit={FunctionCommon.handleSubmit}>
            <div className="imageLogoFrame">
                <img className="imageLogo" src={ImageLogo} alt="errorImage" />
            </div>

            <div className="signupFrame">

                {/*video player*/}
                <div className="side_Left_BankingVideo">
                    <div className="videoFrame">
                        <video className="video_box" width="1200"
                            loop muted autoPlay controls=''
                            poster={"./img/" + FunctionCommon.randomNumberInRange(1, 12) + ".png"}
                            oncanplay onloadedmetadata >
                            <source src={"/video/" + FunctionCommon.randomNumberInRange(1, 12) + ".mp4"}
                                type="video/mp4" />
                        </video>
                    </div>
                </div>

                <div className="side_Right_signup">
                    <div className="signupInput">

                        <div className="signupHeadBankDetails">
                            <div className="signupWelcome">
                                <h2 className="signupWelcomeMessage">Welcome to</h2>
                            </div>

                            <div className="signupBankName">
                                <h1 className="signupBankNameText">Hakuna Matata Bank</h1>
                            </div>
                        </div>

                        <div className="signup_input_info">
                            {/*Table Left - signup Main Information*/}
                            <div className="signupClassTableMain">
                                <table className="signupClassTable">
                                    <tr>
                                        <div className="signupClassFirstName" id="signupIDFirstName">
                                            <label className="signupClassLabel"
                                                title="Enter your Firstname">
                                                <td className="column1">Firstname
                                                </td>
                                                <td className="column2">
                                                    <input type="text" name="signupFirstName"
                                                        id="signupFirstNameID"
                                                        placeholder="Firstname"
                                                        autoFocus />
                                                </td>
                                            </label>
                                        </div>
                                    </tr>

                                    <tr>
                                        <div className="signupClassLastName" id="signupIDLastName">
                                            <label className="signupClassLabel"
                                                title="Enter your Lastname">
                                                <td className="column1">Lastname
                                                </td>
                                                <td className="column2">
                                                    <input type="text" name="signupLastName"
                                                        id="signupLastNameID"
                                                        placeholder="Lastname" />
                                                </td>
                                            </label>
                                        </div>
                                    </tr>

                                    <tr>
                                        <div className="signupClassUserName" id="signupIDUserName">
                                            <label className="signupClassLabel"
                                                title="Enter your Username or email">
                                                <td className="column1">Username
                                                </td>
                                                <td className="column2">
                                                    <input type="text" name="signupUserName"
                                                        id="signupUserNameID"
                                                        placeholder="Username" />
                                                </td>
                                            </label>
                                        </div>
                                    </tr>

                                    <tr>
                                        <div className="signupClassPassword" id="signupIDPassword">
                                            <label className="signupClassLabel"
                                                title="Enter your password">
                                                <td className="column1">Password
                                                </td>
                                                <td className="column2">
                                                    <input type="password" name="signupPassword"
                                                        id="signupPasswordID"
                                                        placeholder="Password" />
                                                </td>
                                            </label>
                                        </div>
                                    </tr>

                                    <div className="signupAccountSelection">
                                        <div className="signupAccountSelectionTitle">Select account options</div>
                                        <tr>
                                            <div className="signupClassChecking" id="signupClassCheckingID">
                                                <label className="signupClassCheckingLabel"
                                                    title="Select cash deposit amount for your Checking Account">
                                                    <td className="column1">Checking A/C
                                                    </td>
                                                    <td className="column2">
                                                        <span id="signupInputChecking">
                                                            <select name="signupInputCheckingList">
                                                                <option value='500'>$ 500</option>
                                                                <option value='1000'>$ 1000</option>
                                                                <option value='1500'>$ 1500</option>
                                                                <option value='2000'>$ 2000</option>
                                                                <option value='2500'>$ 2500</option>
                                                                <option value='3000'>$ 3000</option>
                                                            </select>
                                                        </span>
                                                    </td>
                                                </label>
                                            </div>
                                        </tr>

                                        <tr>
                                            <div className="signupClassSaving" id="signupClassSavingID">
                                                <label className="signupClassSavingLabel"
                                                    title="Select cash deposit amount for your Savings Account">
                                                    <td className="column1">Savings Account
                                                    </td>
                                                    <td className="column2">
                                                        <span id="signupInputSaving">
                                                            <select name="signupInputSavingList">
                                                                <option value='0' selected>No Savings Account</option>
                                                                <option value='500'>$ 500</option>
                                                                <option value='1000'>$ 1000</option>
                                                                <option value='1500'>$ 1500</option>
                                                                <option value='2000'>$ 2000</option>
                                                                <option value='2500'>$ 2500</option>
                                                                <option value='3000'>$ 3000</option>
                                                            </select>
                                                        </span>
                                                    </td>
                                                </label>
                                            </div>
                                        </tr>

                                        <tr>
                                            <div className="signupClassTFS" id="signupClassTFSID">
                                                <label className="signupClassTFSLabel"
                                                    title="Select cash deposit amount for your TFSA">
                                                    {/*<input type="checkbox" id="signupCheckboxTFS" defaultChecked={false} />*/}
                                                    <td className="column1">Tax Free Saving
                                                    </td>
                                                    <td className="column2">
                                                        <span id="signupInputTFS">
                                                            <select name="signupInputTFSList">
                                                                <option value='0' selected>No TFS Account</option>
                                                                <option value='500'>$ 500</option>
                                                                <option value='1000'>$ 1000</option>
                                                                <option value='1500'>$ 1500</option>
                                                                <option value='2000'>$ 2000</option>
                                                                <option value='2500'>$ 2500</option>
                                                                <option value='3000'>$ 3000</option>
                                                            </select>
                                                        </span>
                                                    </td>
                                                </label>
                                            </div>
                                        </tr>

                                    </div>
                                </table>
                            </div>

                            <div className="signup_signup" id="signupDiv">
                                <button type="submit" name="signupNamesignup"
                                    id="signupNamesignup_ID" >
                                    Signup
                                </button>
                            </div>
                        </div>

                        <div className="signupInfo">
                            <p className="signupInfoText">Do you have an username and password?</p>
                            <a className="signupInfoPage" href="/">
                                Login to view your account details!</a>
                        </div>


                    </div>
                </div>
            </div>


            <div>
                <a id="goHome" href="/home">Go Home.</a>
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