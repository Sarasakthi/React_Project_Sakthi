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
import { collection, addDoc, query, where, getDocs, DocumentSnapshot, onSnapshot, QuerySnapshot, orderBy, limit } from 'firebase/firestore';
import moment from "moment";

export default function Home() {

    const navigate = useNavigate();

    const dbRefAccount = collection(db, "userAccount");
    const dbRefTransaction = collection(db, "userTransaction");
    const [accountList, setAccountList] = useState([]);
    const [transactionList, setTransactionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState("");
    const [currentUseremail, setCurrentUseremail] = useState("")
    const [moreTransaction, setMoreTransaction] = useState(false)

    let currentUserID = null
    //let currentUseremail = null

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is verified
                console.log("my user UID", user.uid + " - " + user.email);
                currentUserID = user.uid
                setCurrentUseremail(user.email)

                getAccountDetails(user.email)
                getTransactionDetails(user.email, 5)

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
    function getAccountDetails(currentUseremailID) {

        const queryData = query(dbRefAccount,
            where("username", "==", (currentUseremailID)));

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

    //Fetching Account Details from Database
    function getTransactionDetails(currentUseremailID, transLimit) {

        console.log("Entering getTransactionDetails");

        let queryData = ""

        if (transLimit == "all") {
            queryData = query(dbRefTransaction,
                where("transUsername", "==", currentUseremailID),
                orderBy("transDate", "desc"));
            console.log("translimit = all")
            console.log(currentUseremailID)
        }
        else {
            queryData = query(dbRefTransaction,
                where("transUsername", "==", currentUseremailID),
                orderBy("transDate", "desc"),
                limit(transLimit));
            console.log("translimit = something")
        }

        const returnData = onSnapshot(queryData, (querySnapshot) => {

            let letMyTransactionList = []
            querySnapshot.forEach((doc) => {
                letMyTransactionList.push({ ...doc.data(), id: doc.id });
                console.log(doc.id, " => ", doc.data());
            });

            console.log(letMyTransactionList)
            setTransactionList(letMyTransactionList);
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
                                            <p>Chequing <span id="tab2">{(myAccountDetails.amountChequing)}</span></p>
                                            <p>Savings <span id="tab2">{myAccountDetails.amountSavings}</span></p>
                                            <p>Tax-Free Savings <span id="tab2">{myAccountDetails.amountTFS}</span></p>
                                        </>
                                    ))}
                                </div>

                                <div className="colEmpty">
                                    <p></p>
                                </div>

                                <div className="colTrans">
                                    {transactionList.map((transaction) => (
                                        <>
                                            <p>
                                                <span className="span1">{moment(new Date(transaction.transDate.seconds * 1000).toLocaleDateString("en-US")).format("YYYY-MMM-DD")}</span>
                                                <span className="span2">- {transaction.transRemarks}</span>
                                                <span className="span3">- $ {transaction.transAmount}</span>
                                                <span className="span5">- to {transaction.transTo}</span>
                                            </p>
                                        </>
                                    ))}
                                    <a href="#" onClick={() => getTransactionDetails(currentUseremail, "all")}>view all transactions</a>
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