import React from "react"

import Header from "../Header/header"
import "./styles_navBar.css"

import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

export default function NavBar() {

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault()
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                alert("Thank you for using Hakuna Matata Banking Application!")
                console.log("Signed out successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                console.error(error);
            });
    };

    return (
        <>

            {/*Insert NavBar*/}
            <Header />

            {/*Nav Bar*/}
            <div className="navBar">
                <div className="navHomePage">
                    <ul>
                        <li className="listNavHome">
                            <a href="/home">Home</a>
                        </li>

                        <li className="navPayment">
                            <a href="/payment">Payment</a>
                        </li>

                        <li className="navAddBeneficiary">
                            <a href="/addbeneficiary">Add Beneficiary</a>
                        </li>

                        <li className="navSignout">
                            <a href="/" onClick={handleLogout}>Signout</a>
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