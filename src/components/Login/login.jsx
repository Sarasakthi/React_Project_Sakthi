import React from "react";

import Footer from "../Common/Footer/footer";
import "./styles_login.css"
import ImageLogo from "../../img/logo.svg"

export default function Login() {
    function oncanplay(event) {
        this.play()
    }

    function onloadedmetadata(event) {
        this.muted = true
    }

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    const randomNumberZeroToMax = (max) => {
        return Math.floor(Math.random() * max);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="imageLogoFrame">
                <img className="imageLogo" src={ImageLogo} alt="errorImage" />
            </div>

            <div className="loginFrame">

                {/*video player*/}
                <div className="side_Left_BankingVideo">
                    <div className="videoFrame">
                        <video className="video_box" width="1200"
                            loop muted autoPlay controls=''
                            poster={"./img/" + randomNumberInRange(1, 12) + ".png"}
                            oncanplay onloadedmetadata >
                            <source src={"/video/" + randomNumberInRange(1, 12) + ".mp4"}
                                type="video/mp4" />
                        </video>
                    </div>
                </div>

                <div className="side_Right_Login">
                    <div className="loginInput">
                        <div className="loginWelcome">
                            <h2 className="loginWelcomeMessage">Welcome to</h2>
                        </div>

                        <div className="loginBankName">
                            <h1 className="loginBankNameText">Hakuna Matata Bank</h1>
                        </div>

                        <div className="login_input_info">
                            <div className="login_input_username">
                                <label className="label_Username">

                                    <input type="text" name="login_Username"
                                        id="login_Username_ID"
                                        autoCapitalize={"none"}
                                        autoComplete={"off"}
                                        placeholder="Username or email"
                                        autoFocus
                                    />
                                </label>
                            </div>

                            <div className="login_input_password">
                                <label className="label_Password">
                                    <input type="password" name="login_Password"
                                        id="login_Password_ID"
                                        autoCapitalize={"none"}
                                        autoComplete={"off"}
                                        placeholder="Password"
                                    />
                                </label>
                            </div>

                            <div className="login_login" id="loginDiv">
                                <button type="submit" name="loginNameLogin"
                                    id="loginNameLogin_ID" >
                                    Login
                                </button>
                            </div>
                        </div>

                        <div className="signupInfo">
                            <p className="signupInfoText">Don't have an username and password?</p>
                            <a className="signupInfoPage" href="/signup">
                                Set them up right now.</a>
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