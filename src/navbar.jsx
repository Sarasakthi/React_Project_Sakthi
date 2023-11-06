import ImageLogo from "./img/logo.svg";
import "./styles_home.css"

export default function NavBar() {
    return (
        <>
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