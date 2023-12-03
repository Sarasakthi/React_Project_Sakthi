import NavBar from "../Common/Navbar/navbar"
import NavBarAdmin from "../Common/Navbar/navbarAdmin"
import "../Home/styles_home.css"
import Footer from "../Common/Footer/footer"
import LogoutApplication from "../Logout/autoLogout";
import * as databaseQuery from "../Firebase/dbQuery"


/*Adding authentication check*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../Firebase/firebase";
import { collection, addDoc, query, where, getDocs, DocumentSnapshot, onSnapshot, QuerySnapshot } from 'firebase/firestore';

export default function Home() {

    const navigate = useNavigate();

    const dbRefAccount = collection(db, "userAccount");
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState("");

    let currentUserID = null
    let currentUseremail = null

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is verified
                console.log("my user UID", user.uid + " - " + user.email);
                currentUserID = user.uid
                currentUseremail = user.email

                getAccountDetails(currentUseremail)

            } else {
                // User is signed out
                console.log("User is logged out. Please login! - home");
                navigate("/");
            }
        });
    }, []);

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

    //Fetching Account Details from Database
    function getAccountDetails(currentUseremail) {

        const queryData = query(dbRefAccount,
            where("username", "==", (currentUseremail)));

        const returnData = onSnapshot(queryData, (querySnapshot) => {

            let letMyAccountList = []
            querySnapshot.forEach((doc) => {
                letMyAccountList.push({ ...doc.data(), id: doc.id });
                console.log(doc.id, " => ", doc.data());
            });

            setAccountList(letMyAccountList);
        });

        //return () => returnData();
    }

    return (
        <LogoutApplication>

            <div>
                <div className="homeUser">
                    <nav>
                        {/*Insert NavBar*/}
                        <NavBar />
                    </nav>

                    <div className="helloUser">
                        {accountList.map((myAccountDetails) => (
                            <h3>Hello
                                <span> {myAccountDetails.firstname}</span>!</h3>
                        ))}
                    </div>

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

                                    {accountList.map((myAccountDetails) => (
                                        <>
                                            <p>Checking <span id="tab2">{(myAccountDetails.amountChecking)}</span></p>
                                            <p>Savings <span id="tab2">{myAccountDetails.amountSavings}</span></p>
                                            <p>Tax-Free Savings <span id="tab2">{myAccountDetails.amountTFS}</span></p>
                                        </>
                                    ))}
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

                </div>
                <footer className="footerText">
                    {/*Insert Footer*/}
                    <Footer />
                </footer>

            </div>
        </LogoutApplication>
    )
}