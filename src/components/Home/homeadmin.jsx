import NavBar from "../Common/Navbar/navbar"
import NavBarAdmin from "../Common/Navbar/navbarAdmin"
import "../Home/styles_homeadmin.css"
import Footer from "../Common/Footer/footer"
import LogoutApplication from "../Logout/autoLogout";
import * as databaseQuery from "../Firebase/dbQuery"


/*Adding authentication check*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../Firebase/firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, onSnapshot, QuerySnapshot, doc } from 'firebase/firestore';

export default function HomeAdmin() {

    const navigate = useNavigate();

    const dbRefAccount = collection(db, "userAccount");
    const [usersList, setUsersList] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");

    let currentUserID = null
    let currentUseremail = null

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is verified
                console.log("my admin UID", user.uid + " - " + user.email);
                currentUserID = user.uid;
                currentUseremail = user.email;

                //getAccountDetails(currentUseremail);
                getUsersList();

            } else {
                // User is signed out
                console.log("User is logged out. Please login! - homeadmin");
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

    //Fetching User Details from Database
    const getUsersList = async () => {
        try {
            const userList = await getDocs(dbRefAccount);
            const returnData = userList.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setUsersList(returnData);
        }
        catch (err) {
            console.error(err);
        }
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

    const deleteUser = async (id, userEmail) => {

        let returnMsg = ""

        //getUserAuthByEmail(userEmail)
        
        const returnVal = prompt('Please enter user email to confirm delete')

        if (userEmail === returnVal) {
            //Delete from User Account Table
            const userDoc = doc(db, "userAccount", id);
            await deleteDoc(userDoc);

            /*
            //Delete from User Account Table
            for (let i = 1; i <= 4; i++) {
                let userDoc = doc(db,
                    ((i == 1) ? "userTransaction" :
                        (i == 2) ? "userBeneficiary" :
                            (i == 3) ? "userRole" :
                                "userAccount"), id);
                await deleteDoc(userDoc);
            }
            */

            returnMsg = "Useremail " + returnVal + " has been deleted from the database!"
        }
        else {
            returnMsg = "Oops! The useremail " + returnVal + " does not match the delete user you have chosen.\n\n" +
                "Please try again!"
        }
        
        alert(returnMsg)
        window.location.reload();
    };

    function getUserAuthByEmail(userEmail) {
        getAuth()
            .getUserByEmail(userEmail)
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });

    }

    function deleteUserAuthentication(uid) {
        getAuth()
            .deleteUser(uid)
            .then(() => {
                console.log('Successfully deleted user');
            })
            .catch((error) => {
                console.log('Error deleting user:', error);
            });

    }

    const updateEmail = async (id) => {
        const userDoc = doc(db, "users", id);
        await updateDoc(userDoc, { Email: updatedEmail });
    };

    return (
        <LogoutApplication>

            <div>
                <div className="homeAdmin">
                    <nav>
                        {/*Insert NavBar*/}
                        <NavBarAdmin />
                    </nav>

                    <div className="helloUser">
                        <h3>Hello <span>Admin</span>!</h3>
                    </div>

                    <div className="userDetails">

                        {/*Asset and Transaction Header*/}
                        <div className="rowUserDetails">

                            <div className="userDetailsDiv">

                                {/*Page Name*/}
                                <div className="userDetailsHeaderDiv">
                                    <p className="userDetailsHeader">User Details</p>
                                </div>

                                <div className="usersList">
                                    {usersList.map((user) => (
                                        <div className="usersListDisplay">
                                            <p>Firstname:<span>{user.firstname}</span></p>
                                            <p>Lastname:<span>{user.lastname}</span></p>
                                            <p>Username:<span>{user.username}</span></p>
                                            <p>
                                                <button
                                                    onClick={() =>
                                                        deleteUser(user.id, user.username)}>Delete user
                                                </button>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="userList">

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







