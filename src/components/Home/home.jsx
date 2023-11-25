import NavBar from "../Common/Navbar/navbar"
import "../Home/styles_home.css"
import Footer from "../Common/Footer/footer"
import LogoutApplication from "../Logout/autoLogout";
import { FunctionDBQueryList } from "../Firebase/dbQuery";

/*Adding authentication check*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from "../Firebase/firebase";

export default function Home() {

    const navigate = useNavigate();

    let currentUserID = null

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log("UID", user.uid);
                currentUserID = user.uid
                console.log("Going to FunctionDBQueryList")

                console.log("Home Printed")
            } else {
                // User is signed out
                console.log("User is logged out. Please login!");
                navigate("/");
            }
        });
    });

    const dbRefAccount = collection(db, "userAccount");
    const [accountList, setAccountList] = useState("");
    const fetchAccountBalanceFromDB = async () => {
        try {
            let username = currentUserID
            const data = await getDocs(dbRefAccount);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            console.log("Printing")
            console.log(setAccountList(filterData))
            console.log("Printed")
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                alert("Thank you for using Hakuna Matata Banking Application!")
                console.log("Signed out successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        //<LogoutApplication>
        <div>
            <nav>
                {/*Insert NavBar*/}
                <NavBar />
            </nav>

            <div className="assetAndTrans">
                {/*Asset and Transaction Header*/}
                <div className="rowAssetTransHeader">
                    {/*Asset*/}
                    <div className="colAssetHeader">
                        <p>Assets (CAD)</p>
                    </div>

                    <div className="colEmptyHeader">
                        <p></p>
                    </div>

                    <div className="colTransHeader">
                        <p>Last 5 Transactions (CAD)</p>
                    </div>
                </div>

                {/*Asset and Transaction*/}
                <div className="rowAssetTrans">
                    <div className="colMain">
                        {/*Asset*/}
                        <div className="colAsset">
                            <p>Checking <span id="tab2">(Account # 1)</span></p>
                            <p>Savings <span id="tab2">(Account # 2)</span></p>
                            <p>Tax-Free Savings <span id="tab2">(Account # 3)</span></p>
                        </div>

                        <div className="colEmpty">
                            <p></p>
                        </div>

                        <div className="colTrans">
                            <p>October 28, 2023 ABM Withdrawal $100.00 $3,286.63</p>
                            <p>October 24, 2023 Funds Transfer $1,353.65 $3,386.63</p>
                            <p>October 24, 2023 Transfer Dr. $1,000.00</p>
                            <p>October 23, 2023 Bill Payment Telus $107.01 $5,740.28</p>
                            <p>October 20, 2023 GST CANADA $827.03 $5,847.29</p>
                            <br></br>
                            <p><a href="#statement">view more transactions</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footerText">
                {/*Insert Footer*/}
                <Footer />
            </footer>
        </div>
        //</LogoutApplication>
    )
}