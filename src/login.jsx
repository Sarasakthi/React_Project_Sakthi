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
                    <div className="loginInput">
                        <div className="login_input_username">
                            <label className="label_Username">Enter your username
                                <input type="text" name="login_Username"
                                    id="login_Username_ID" />
                            </label>
                        </div>

                        <div className="login_input_password">
                            <label className="label_Password">Enter your username
                                <input type="text" name="login_Password"
                                    id="login_Password_ID" />
                            </label>
                        </div>

                        <div className="login_login" id="loginDiv">
                            <button type="submit" name="loginNameLogin"
                                id="loginNameLogin_ID">
                                Login
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
        </div>
    )
}