import React from "react"

import Header from "./header"
import "./styles_navBar.css"

export default function NavBar() {
    return (
        <>

            {/*Insert NavBar*/}
            <Header />

            {/*Nav Bar*/}
            <div className="navBar">
                <div className="navHomePage">
                    <ul>
                        <li className="listNavHome">
                            <a href="/">Home</a>
                        </li>

                        <li className="navPayment">
                            <a href="/payment">Payment</a>
                        </li>

                        <li className="navContact">
                            <a href="/contact">Contact</a>
                        </li>

                        <li className="navSignout">
                            <a href="/signout">Signout</a>
                        </li>

                    </ul>
                </div>
            </div>

            {/*Welcome Message*/}
            <div className="welcome">
                <div className="welcomeMsg">
                    <p>Welcome to Hakuna Matata Bank</p>
                </div>
                <div className="lastLogin">
                    <p id="loginDateTime"></p>
                    <script>
                        const currentDateTime = new Date();
                        document.getElementById("loginDateTime").innerHTML = 'Your last login: ' + currentDateTime.toLocaleString();
                    </script>
                </div>
            </div>
        </>
    )
}