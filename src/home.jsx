import ImageLogo from "./img/logo.svg";
import "./styles_home.css"

export default function Home() {
    return (
        <div>
            {/*Insert Logo*/}
            <div class="header">
                <div class="inline-block float-left logo">
                    <a className="home" href="#home">
                        <img id="imageLogo" src={ImageLogo} alt="errorImage" />
                    </a>
                </div>

            </div>


            {/*Nav Bar*/}
            <div className="navBar">
                <div className="navHomePage">
                    <ul>
                        <li className="listNavHome">
                            <a href="#home">Home</a>
                        </li>

                        <li className="navPayment">
                            <a href="#payment">Payment</a>
                        </li>

                        <li className="navContact">
                            <a href="#contact">Contact</a>
                        </li>

                        <li className="navSignout">
                            <a href="#signout">Signout</a>
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
    )
}