import React from "react";

import Footer from "./footer";
import "./styles_login.css"


export default function Login() {
    function oncanplay(event) {
        this.play()
    }

    function onloadedmetadata(event) {
        this.muted = true
    }

    return (
        <div>
            <div className="loginFrame">

                {/*video player*/}
                <div className="side_Left_BankingVideo">
                    <div className="videoFrame">
                        <video className="video_box" width="750" height="500"
                            loop muted autoPlay controls=''
                            poster="./img/1.png"
                            oncanplay onloadedmetadata >
                            <source src="/video/1.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>

                <div className="side_Right_Login">
                    <div className="paymentAmount" id="paymentDiv">
                        <label className="paymentLabel">
                            <td className="column1">Amount $:</td>
                            <td className="column2">
                                <input type="text" name="paymentNameAmount"
                                    id="paymentIDAmount" />
                            </td>
                        </label>
                    </div>

                </div>
            </div>

            <div className="footer">
                <footer className="footerText">
                    {/*Insert Footer*/}
                    <Footer />
                </footer>
            </div>
        </div>
    )
}