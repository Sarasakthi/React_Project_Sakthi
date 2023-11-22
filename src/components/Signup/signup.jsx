import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";


import Footer from "../Common/Footer/footer"
import "./styles_signup.css"
import * as FunctionCommon from "../Common/General/commonFunctions"
import ImageLogo from "../../img/logo.svg"

export default function Contact() {

    /*------------
    Signup Handler
    ------------*/
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [acountChecking, setAccountChecking] = useState(0);
    const [accountSavings, setAccountSavings] = useState(0);
    const [accountTFSA, setAccountTFSA] = useState(0);

    const submitSignup = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        console.log("Auth:", auth);
        console.log("Firstname:", firstname);
        console.log("Lastname:", lastname);
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Acount Checking:", acountChecking);
        console.log("Account Savings:", accountSavings);
        console.log("Account TFSA:", accountTFSA);

        await createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                const loginErrorMsg = "Signup unsuccessful! \nPlease try again later."
                alert(loginErrorMsg)
            });
    }

    return (
        <form method="post" onSubmit={submitSignup}>
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
                                                        value={firstname}
                                                        onChange={(e) => setFirstname(e.target.value)}
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
                                                        value={lastname}
                                                        onChange={(e) => setLastname(e.target.value)}
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
                                                    <input type="email" name="signupUserName"
                                                        id="signupUserNameID"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
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
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
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
                                                            <select name="signupInputCheckingList"
                                                                onChange={(e) => setAccountChecking(e.target.value)}>
                                                                <option value={500}>$ 500</option>
                                                                <option value={1000}>$ 1000</option>
                                                                <option value={1500}>$ 1500</option>
                                                                <option value={2000}>$ 2000</option>
                                                                <option value={2500}>$ 2500</option>
                                                                <option value={3000}>$ 3000</option>
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
                                                            <select name="signupInputSavingList"
                                                                onChange={(e) => setAccountSavings(e.target.value)}>
                                                                <option value={0} selected>No Savings Account</option>
                                                                <option value={500}>$ 500</option>
                                                                <option value={1000}>$ 1000</option>
                                                                <option value={1500}>$ 1500</option>
                                                                <option value={2000}>$ 2000</option>
                                                                <option value={2500}>$ 2500</option>
                                                                <option value={3000}>$ 3000</option>
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
                                                            <select name="signupInputTFSList"
                                                                onChange={(e) => setAccountTFSA(e.target.value)}>
                                                                <option value={0} selected>No TFS Account</option>
                                                                <option value={500}>$ 500</option>
                                                                <option value={1000}>$ 1000</option>
                                                                <option value={1500}>$ 1500</option>
                                                                <option value={2000}>$ 2000</option>
                                                                <option value={2500}>$ 2500</option>
                                                                <option value={3000}>$ 3000</option>
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